# Frontend

`FE-01` to `FE-05`. Vue 3.5 and `<script setup lang="ts">` only for new
frontends. The Options API and Vue 2 are not used. The bundler is Vite.
Node.js 24 for a new frontend, Node.js 22 where the application is already
there (`STACK-01`).

TypeScript is strict:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Stay on the TypeScript major the project's `vue-tsc` already typechecks
(`STACK-01`). Jumping majors ahead of `vue-tsc` is not an upgrade.

## A component

Section order is fixed: script, template, style.

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

Inside the script: imports, local types, props and emits, state, computed
values, functions, lifecycle. `defineProps` is typed with an interface or a
generic, not a runtime array, when the project already types props that way.

`any` is forbidden. An unknown payload is `unknown` until a check narrows it.
No `eval`. Comparisons are `===`. Async work uses `await`, and the caller
that can show a failure handles the rejection.

User-visible strings go through the project's i18n. Do not hardcode a second
copy of a sentence in a component.

## The UI kit

`@dskripchenko/ui` is the component set (`UidButton`, `UidCard`, and the
rest). Icons come from `@dskripchenko/ui/icons`. If the kit has the control,
use it. Do not add another component library, and do not redraw a kit
control with one-off CSS when a prop exists.

A missing control is a change to the kit, released there, then bumped in the
application (`FE-02`). `main` depends on a released version. Do not fork
the control into the application "for now" unless the task says the
application owns that widget.

A second component library, icon font or jQuery already imported by an old
screen stays until its own removal task (`DEP-10`). Do not add another.

## Styles

`FE-03`. New styles are BEM in SCSS. A block is a component, an element is
`block__element`, a modifier is `block--modifier` or
`block__element--modifier`. Tokens are the kit's custom properties
(`var(--uid-color-text)` and the names the kit already publishes). Do not
add a one-off hex color when a token exists.

```vue
<style scoped lang="scss">
.project-card__title {
  color: var(--uid-color-text);
}
</style>
```

A file that already uses another notation keeps it (`CORE-05`).

## Two layouts

### Forge

```
frontend/src/api/client.ts     # fetch, envelope, ApiError
frontend/src/components/
frontend/src/composables/useSession.ts
frontend/src/views/HomeView.vue
frontend/src/i18n/
```

The client talks to a same-origin `dskripchenko/laravel-api`:

- `fetch` with `credentials: 'same-origin'`
- `GET /sanctum/csrf-cookie` when the CSRF cookie is missing
- `X-XSRF-TOKEN` on every write
- the body is `{ success, payload }`; a failed `success` throws a typed error
- one retry on HTTP 419 after a fresh CSRF cookie

Do not add Axios, and do not add Pinia, unless the repository already has
them. Shared state that is one screen wide is a composable.

Package manager is the one the repository commits (`pnpm` where a
`pnpm-lock.yaml` exists). Do not commit a second lockfile.

### Handbook (Feature-Sliced Design)

When `src/app`, `src/pages`, `src/widgets`, `src/features`, `src/entities`
and `src/shared` exist, keep them.

Imports flow downward only: `app → pages → widgets → features → entities →
shared`. A slice does not import a sibling slice. Callers import the slice's
`index.ts` and nothing under it.

The HTTP client is Axios. Pinia holds state that several distant screens
share. A form uses the project's validation composable, not a new one.

## Checks

`vue-tsc --noEmit` and ESLint are required. The project's `lint` script is
the definition of a warning budget; where it says `--max-warnings=0`, a
warning fails the change. Vitest covers a component that has logic, a
composable and the API client. Snapshot tests are for stable presentational
markup, not for a page that changes with data.
