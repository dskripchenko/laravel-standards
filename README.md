# dskripchenko/laravel-standards

Source of truth for PHP, Laravel and Vue projects: how code is written, how an
application is shaped, what a change may and may not do, how documentation is
written, and which packages are allowed.

The package is a Composer **library** with no PHP code and no autoload.
Installing it does not boot anything and does not change the application.
It only puts this text on disk, where people and models can read it.

Models read [`AGENTS.md`](AGENTS.md). The shape files are in
[`shapes/`](shapes/forge.md). Chapters with examples are in
[`docs/`](docs/README.md). Recipes are in [`recipes/`](recipes/README.md).
Templates to copy are in [`templates/`](templates/project-passport.md).
The Russian translation for people is in [`docs/ru/`](docs/ru/README.md).

## Install

From a project that already has Packagist, or another Composer repository
the project already uses:

```bash
composer require dskripchenko/laravel-standards
```

Until the package is on Packagist, use the Git repository and a released
tag in a shared project:

```bash
composer config repositories.laravel-standards vcs https://github.com/dskripchenko/laravel-standards
composer require dskripchenko/laravel-standards:^1.0
```

Commit the application's lockfile so every developer uses the same release.
For local work on the standards themselves, point Composer at a local
checkout. When the application sits next to this repository, `url` is
`../laravel-standards`:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../laravel-standards",
            "options": {
                "symlink": true
            }
        }
    ]
}
```

```bash
composer require dskripchenko/laravel-standards:@dev
```

From anywhere else, set `url` to the relative path of this directory.
`symlink: true` keeps the installed tree equal to the checkout, so
a pull of the standards is visible without another `composer update`.

Composer will warn that the package has no autoload section. That is
intentional. Do not add one.

## Make it the base

The standards apply when the project says they do. Add the import below to
**both** `AGENTS.md` and `CLAUDE.md` at the root of the project. Create
either file if it is missing. Put the import first. The passport and any
project override come after it. The full block is in
[`templates/claude-import.md`](templates/claude-import.md).

```markdown
@vendor/dskripchenko/laravel-standards/AGENTS.md
```

The path is always `vendor/dskripchenko/laravel-standards/AGENTS.md`,
including when Composer installed the package as a symlink. Do not copy
`AGENTS.md` into the project. A copy goes stale; the vendor file does not.

A model that opens the repository starts at the project's `AGENTS.md` or
`CLAUDE.md`, follows the import, and then applies the passport and the
overrides written under it.

## Verify every agent

Not every agent expands an `@` import. For an agent that does not, put the
explicit read instruction from `templates/claude-import.md` in its native
instruction file. Do not replace the import with a copied snapshot.

Record each verified agent in `templates/agent-compatibility.md` or the
equivalent project document. Verification means the agent can cite the
installed standards version and the project shape from the files it read.

## What wins

`CORE-01`. Highest first:

1. The law, and the terms of every service the change touches.
2. An ADR in the project's ADR folder.
3. The project's `AGENTS.md` and `CLAUDE.md`, including the passport.
4. The house handbook, when the project is built and maintained to it.
5. This package: `AGENTS.md`, then `shapes/<shape>.md`, then `docs/`.

Four application shapes are accepted. The passport names the one the
repository uses. Do not mix them in one change. The shapes are defined in
[`AGENTS.md`](AGENTS.md) and [`shapes/`](shapes/forge.md).

## Layout of this package

| Path | Who it is for |
| --- | --- |
| `AGENTS.md` | Models. English. The rules, with codes, without the long examples. |
| `shapes/` | Models. One file per application shape. |
| `docs/` | Models and people. English chapters with examples. |
| `docs/ru/` | People. The same chapters in Russian. |
| `recipes/` | Models. Short procedures for a common task. |
| `templates/` | People and models. Files to copy into a project. |
| `composer.json` | Composer. `type` is `library`, `php` is `*`, no autoload. |

## Updating

Bump the constraint in the application (`composer update dskripchenko/laravel-standards`)
or pull this checkout when it is a path repository. Then read the new
`CHANGELOG.md`. Do not vendor a snapshot of the markdown into the application.
