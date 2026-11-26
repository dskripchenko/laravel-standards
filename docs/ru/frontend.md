# Фронтенд

`FE-01`–`FE-05`. Для нового фронтенда — Vue 3.5 и только
`<script setup lang="ts">`. Options API и Vue 2 не используют. Сборщик —
Vite. Node.js 24 для нового фронтенда, Node.js 22 там, где приложение уже
на нём (`STACK-01`).

TypeScript в строгом режиме:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Остаются на той основной версии TypeScript, которую `vue-tsc` проекта уже
проверяет (`STACK-01`). Перепрыгивать основную версию раньше, чем проходит
`vue-tsc`, — не обновление.

## Компонент

Порядок секций фиксирован: script, template, style.

```vue
<script setup lang="ts">
import { UidButton } from '@dskripchenko/ui'
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const title = computed(() => props.name)
</script>

<template>
  <UidButton>{{ title }}</UidButton>
</template>
```

Внутри script: импорты, локальные типы, props и emits, состояние,
вычисляемые значения, функции, жизненный цикл. `defineProps` типизируют
интерфейсом или обобщением, а не массивом во время выполнения, если проект
уже типизирует props так.

`any` запрещён. Неизвестный ответ — `unknown`, пока проверка его не сузит.
`eval` нет. Сравнение — `===`. Асинхронная работа — через `await`, и отказ
обрабатывает тот вызывающий, который может его показать.

Строки, которые видит человек, идут через i18n проекта. Вторую копию
фразы в компонент не вписывают.

## UI-kit

`@dskripchenko/ui` — набор компонентов (`UidButton`, `UidCard` и остальные).
Значки — из `@dskripchenko/ui/icons`. Если в наборе есть нужный элемент,
используют его. Вторую библиотеку компонентов не добавляют и не перерисовывают
элемент набора разовым CSS, если у него есть свойство.

Недостающего элемента нет в приложении: его делают в наборе, выпускают там
и только потом подключают в приложении (`FE-02`). В `main` стоит выпущенная
версия. Копировать элемент в приложение «на время» нельзя, если задача прямо
не говорит, что виджет принадлежит приложению.

Вторая библиотека компонентов, набор значков или jQuery, которые старый
экран уже импортирует, остаются до отдельной задачи на удаление (`DEP-10`).
Ещё одну не добавляют.

## Стили

`FE-03`. Новые стили — BEM на SCSS. Блок — это компонент, элемент —
`block__element`, модификатор — `block--modifier` или
`block__element--modifier`. Токены — пользовательские свойства набора
(`var(--uid-color-text)` и имена, которые набор уже публикует). Свой
шестнадцатеричный цвет не вводят, если токен уже есть.

```vue
<style scoped lang="scss">
.project-card__title {
  color: var(--uid-color-text);
}
</style>
```

Файл, который уже написан иначе, таким и остаётся (`CORE-05`).

## Две раскладки

### Forge

```
frontend/src/api/client.ts     # fetch, конверт, ApiError
frontend/src/components/
frontend/src/composables/useSession.ts
frontend/src/views/HomeView.vue
frontend/src/i18n/
```

Клиент ходит в `dskripchenko/laravel-api` того же сайта:

- `fetch` с `credentials: 'same-origin'`
- `GET /sanctum/csrf-cookie`, когда нет CSRF-cookie
- `X-XSRF-TOKEN` на каждую запись
- тело — `{ success, payload }`; неуспешный `success` бросает типизированную ошибку
- одна повторная попытка на HTTP 419 после свежей CSRF-cookie

Axios и Pinia не добавляют, если их в репозитории ещё нет. Состояние шириной
в один экран — composable.

Менеджер пакетов — тот, чей lock-файл уже в репозитории (`pnpm`, если есть
`pnpm-lock.yaml`). Второй lock-файл не коммитят.

### Handbook (Feature-Sliced Design)

Если уже есть `src/app`, `src/pages`, `src/widgets`, `src/features`,
`src/entities` и `src/shared`, их сохраняют.

Импорт идёт только вниз: `app → pages → widgets → features → entities →
shared`. Слой не импортирует соседний сегмент того же слоя. Снаружи сегмента
берут только его `index.ts`.

HTTP-клиент — Axios. Pinia хранит состояние, которое нужно далёким друг от
друга экранам. Форма использует composable валидации проекта, а не новый.

## Проверки

Нужны `vue-tsc --noEmit` и ESLint. Скрипт `lint` проекта задаёт бюджет
предупреждений; где написано `--max-warnings=0`, предупреждение ломает
задачу. Vitest покрывает компонент с логикой, composable и клиент API.
Снимок (snapshot) — для устойчивой оформительской вёрстки, не для страницы,
которая меняется вместе с данными.
