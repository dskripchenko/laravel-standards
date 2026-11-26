# База данных

`DB-01`–`DB-06`. Новое приложение использует PostgreSQL. Существующее
оставляет ту СУБД, которая уже стоит в production, включая MySQL. Тесты,
CI и production — один и тот же движок и одна и та же основная версия.
SQLite запрещён, в том числе в памяти: типы, индексы и блокировки не
совпадут. Переезд существующего приложения на PostgreSQL — это ADR.

Новое приложение держит кеш, сессии и очереди на Valkey через драйвер
Laravel `redis` (`STACK-04`). Переменные остаются `REDIS_*`. Это имя
клиента, не сервера. Приложение, у которого кеш уже другой, оставляет его
до ADR.

## Имена

| Что | Форма | Пример |
| --- | --- | --- |
| Таблица | множественное число, snake_case | `order_items` |
| Сводная таблица | два имени в единственном числе, по алфавиту | `role_user` |
| Столбец | единственное число, snake_case | `gitlab_path` |
| Первичный ключ | `id` | `id` |
| Внешний ключ | `{модель}_id` | `project_id` |
| Логическое | `is_`, `has_`, `can_` | `is_active` |
| Метка времени | `*_at`; на PostgreSQL — `timestamptz` | `archived_at` |
| Индекс | `{таблица}_{столбцы}_{суффикс}` | `projects_name_index` |

Без префиксов `tbl_` и без кавычек вокруг имён. Новая схема PostgreSQL не
использует типы только MySQL (`TINYINT`, `AUTO_INCREMENT`, обратные
кавычки). Приложение, которое уже на MySQL, оставляет типы этого движка
(`DB-01`) и не объявляет столбец как `timestamptz`.

Деньги — `numeric` / `decimal`. Строка без настоящего предела — `text`.
Строка с пределом использует этот предел, а не автоматический `varchar(255)`.

## Миграции

Анонимный класс, методы `up` и `down`. Комментарий у каждого столбца, кроме
`id`, `created_at`, `updated_at` и `deleted_at`. Пример ниже — для PostgreSQL.

```php
<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Display name');
            $table->string('gitlab_path')->unique()->comment('GitLab path, products/<name>');
            $table->timestampTz('archived_at')->nullable()->comment('When the project left the default list');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
```

Столбец статуса — строка и приведение к PHP backed enum. В комментарии
перечислены значения. Тип `ENUM` самого PostgreSQL не заводят, если
репозиторий его ещё не использует.

На PostgreSQL индексы GIN, частичные и по выражению идут через
`DB::statement`, и в `down` есть парный `DROP INDEX`:

```php
DB::statement(
    'CREATE INDEX projects_name_active_index ON projects (name) WHERE archived_at IS NULL'
);
```

## Запросы

Сначала Eloquent и построитель запросов. Сырой SQL — для того, чего
построитель сказать не может, со связанными параметрами.

- В сыром запросе столбцы перечисляют. `SELECT *` не пишут.
- Индексируемый столбец в `WHERE` не оборачивают функцией.
- Большую таблицу листают по ключу, а не растущим `OFFSET`.
- Связи — `with()`, `loadMissing()` и `withCount()`. Ленивая загрузка —
  дефект. Вне production включён `Model::preventLazyLoading()`.
- `NOT EXISTS` вместо `NOT IN` по набору, где может быть null.

JSON в столбце — это `jsonb`, и только для данных, которые не выбирают как
связи. Если по структуре фильтруют, ей нужна таблица или ADR, который
объясняет `jsonb`.

## Живые данные

`DB-05`. Таблица, в которой уже есть строки, меняется тремя выпусками, если
изменение не сводится к добавлению:

1. Расширить. Новый столбец или таблица допускают NULL либо имеют значение
   по умолчанию, которое старый код может не замечать. Выкладывают код,
   который пишет обе формы.
2. Перенести. Строки копирует задача или команда, пачками, вне миграции
   схемы. Повторный запуск безопасен (`JOB-01`).
3. Сузить. В следующем выпуске, когда все читатели перешли на новую форму,
   старый столбец удаляют или ставят `NOT NULL`.

Индекс на большой таблице PostgreSQL создают через
`CREATE INDEX CONCURRENTLY`, в миграции без объемлющей транзакции
(`public $withinTransaction = false`). В `down()` этот индекс удаляют.
Выкладка в production не запускает `down()`. `down()` нужен, чтобы откатить
ветку, которая ещё не доехала до production.

## Транзакции

Запись в несколько таблиц — транзакция. Ошибку ловят там, где вызывающий
может повторить или отказать, и откатывают транзакцию. Проваленную
транзакцию не игнорируют.
