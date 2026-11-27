# Архитектура

`SHAPE-01`. Репозиторий сохраняет каркас, который назван в паспорте.
Нормативные правила каталогов — в `shapes/`. Здесь два каркаса с длинными
примерами, затем ссылки на остальные два.

## Каркас forge

Приложения этого каркаса устроены как домены плюс версионированное API на
`dskripchenko/laravel-api`. Новое приложение этого каркаса начинается так.
Отказ, права и аудит — в `shapes/forge.md`.

```
app/
  Api/
    ApiModule.php
    V1/
      Api.php
      Controllers/
  Domain/
    Projects/
      Project.php
  Http/
    Controllers/
    Middleware/
  Integrations/
  Providers/
frontend/
  src/
    api/
    components/
    composables/
    views/
    i18n/
```

Модель — финальный класс Eloquent в пространстве имён своего домена.
В PHPDoc перечислены все столбцы. Имена в JSON — camelCase, и перевод
делается в одном методе.

```php
<?php

declare(strict_types=1);

namespace App\Domain\Projects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * A project in the registry.
 *
 * @property int $id
 * @property string $name
 * @property string $gitlab_path
 * @property Carbon|null $archived_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
final class Project extends Model
{
    /** @var list<string> */
    protected $guarded = ['id'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'archived_at' => 'datetime',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPayload(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'gitlabPath' => $this->gitlab_path,
            'archivedAt' => $this->archived_at?->toIso8601String(),
        ];
    }
}
```

Контроллер API проверяет права, валидирует, вызывает домен и возвращает
конверт. Блок документации — контракт, из которого `dskripchenko/laravel-api`
собирает OpenAPI.

```php
<?php

declare(strict_types=1);

namespace App\Api\V1\Controllers;

use App\Domain\Projects\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ProjectsController extends Controller
{
    /**
     * Projects
     *
     * @input boolean ?$archived Archived ones too
     *
     * @output array $projects id, name, gitlabPath, archivedAt
     */
    public function list(Request $request): JsonResponse
    {
        $this->user($request);
        $request->validate(['archived' => ['nullable', 'boolean']]);

        $query = Project::query()->orderBy('name');
        if (! $request->boolean('archived')) {
            $query->whereNull('archived_at');
        }

        return $this->success([
            'projects' => $query->get()
                ->map(static fn (Project $project): array => $project->toPayload())
                ->all(),
        ]);
    }
}
```

Класс версии регистрирует контроллер:

```php
public static function getMethods(): array
{
    return [
        'controllers' => [
            'projects' => [
                'controller' => ProjectsController::class,
                'actions' => ['list', 'show', 'save'],
            ],
        ],
    ];
}
```

Операция сложнее запроса живёт рядом с моделью
(`Domain/Projects/ArchiveProject.php`), не в контроллере. Исходящие вызовы —
в `Integrations/`, и только они знают формат чужого API.

В этот каркас не добавляют корневые `app/Actions`, свалку `app/Services`,
`app/Builders`, `spatie/laravel-data`, репозиторий на каждую модель и Orchid.

## Каркас handbook

Приложения по домашнему handbook используют базовые классы слоёв и Orchid.
Если репозиторий уже такой — его таким и оставляют.

| Слой | Базовый класс | Что внутри |
| --- | --- | --- |
| `app/Http/Controllers` | `BaseController` | На метод — один вызов действия и один ответ |
| `app/Models` | `BaseModel` | Связи, приведения типов, PHPDoc, `newEloquentBuilder()` |
| `app/Builders` | `BaseBuilder` | Методы выборки, возвращают `static` |
| `app/Actions` | `BaseAction` | Одна вызываемая бизнес-операция записи |
| `app/Services` | `BaseService` | Правила, которые пересекают сущности |
| `app/Data` | `BaseData` (`spatie/laravel-data`) | Объекты входа и выхода |
| `app/Http/Requests` | `FormRequest` | Валидация и, для нестандартных действий, авторизация |
| `app/Policies` | — | Одна политика на модель |
| `app/Orchid/Sections/<Entity>` | — | Экраны списка, правки и просмотра |

Контроллер получает действие через метод:

```php
public function store(StoreProjectRequest $request, CreateProjectAction $createProject): JsonResponse
{
    $project = ($createProject)(ProjectData::from($request->validated()));

    return response()->json(new ProjectResource($project), 201);
}
```

Зависимость контроллера приходит в метод, не в конструктор. Единственное
допустимое использование конструктора — `authorizeResource()`.

Запросы идут через builder. `Project::where('is_active', true)` в
контроллере или сервисе — ошибка. Вызов — `Project::query()->active()`.
Методы `scope*` на модели запрещены.

У значимой сущности в Orchid три экрана: список с пагинацией, поиском,
фильтрами и сортировкой; один экран правки на создание и изменение; экран
просмотра. Права регистрируются и проверяются. Тест покрывает, кто может
открыть экран, а не вёрстку.

## Каркас laravel-admin

`app/Admin` вместе с `dskripchenko/laravel-admin`. Экраны следуют этому
пакету. Домены, когда они есть, следуют `DOM-02`. Долгие процессы — файлу
`shapes/laravel-admin.md`. Orchid рядом с этим пакетом не ставят.

## Старый каркас

`app/Services`, `app/Components`, `app/Helpers` или `app/Traits`, и нет
`app/Domain`. Новый код ложится в существующие каталоги и в существующий
стиль (`shapes/legacy.md`). Перенос в домены — строка в `docs/domain-map.md`,
а не побочный эффект функции.

## Пустой репозиторий

Сначала смотрят паспорт, `AGENTS.md`, `CLAUDE.md` и каталог ADR.

- Новый продукт без готового дерева — каркас forge, если задача не про
  админку. Админка начинается как laravel-admin. Выбор записывают в паспорт
  до второго модуля.
- Проект, который собирает домашний handbook, со стеком Orchid — каркас
  handbook.
- Уже есть одно из четырёх деревьев — остаётся оно. Если подходят две
  строки, `SHAPE-01` останавливается на первой: laravel-admin, затем
  handbook, затем forge, затем старый каркас.

## Общее для всех каркасов

- `declare(strict_types=1)` в каждом PHP-файле.
- Конкретные классы — `final`.
- Связи загружаются заранее. Вне production включён
  `Model::preventLazyLoading()`.
- `env()` — только внутри `config/`.
- Замкнутый набор значений — backed enum, имена вариантов в PascalCase.
- Проверка прав на сервере выполняется до того, как домен меняет состояние.
- Тесты идут на СУБД production. SQLite запрещён (`DB-01`).
