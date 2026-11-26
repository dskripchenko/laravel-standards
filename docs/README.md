# Standards

English chapters. The rules, without the examples, are in the root
[`AGENTS.md`](../AGENTS.md). When a chapter and `AGENTS.md` disagree,
`AGENTS.md` wins. A project's own ADR and instruction files sit above this
package (`CORE-01`). The Russian translation is in [`ru/`](ru/README.md).

| Chapter | What it covers |
| --- | --- |
| [Architecture](architecture.md) | The four shapes, and how not to mix them |
| [PHP](php.md) | Language, Pint, Larastan, types, enums |
| [Database](database.md) | Names, migrations, live data, queries |
| [Frontend](frontend.md) | Vue 3, TypeScript, the UI kit, BEM, the two layouts |
| [Security](security.md) | Secrets, authorization, personal data, audits |
| [Testing](testing.md) | Pest or PHPUnit, coverage for new and old projects |
| [End-to-end](e2e.md) | Python scenarios, the forge TypeScript exception, `data-testid` |
| [Domains](domains.md) | Moving a product into `app/Domain` |
| [Operations](operations.md) | Queues, integrations, flags, logs, cache |
| [Packages](packages.md) | What a house package ships |
| [Documentation](documentation.md) | Language, ADR, changelog, what to update |
| [Workflow](workflow.md) | Dependencies, git, CI, legal limits |
| [Sources](sources.md) | Where these rules come from |

Shape files are in [`../shapes/`](../shapes/forge.md). Recipes are in
[`../recipes/`](../recipes/README.md). Copy-paste templates are in
[`../templates/`](../templates/project-passport.md).

Read the chapter for the area you are changing. Then follow the code that
is already in the repository.
