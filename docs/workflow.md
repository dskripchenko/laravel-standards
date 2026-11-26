# Workflow

## Dependencies

Before adding a package, in this order:

1. Can Laravel, PHP, Vue or the standard library do it?
2. Does a `dskripchenko/*` or `@dskripchenko/*` package already do it?
3. Is the vendor trusted? The lists are `DEP-01`. Tailwind is for a
   project that already uses it. New styles follow `FE-03`.
4. Otherwise the package needs 400 000 installs (Packagist total or npm
   weekly), a release in the last 12 months, stack compatibility, and a
   clean audit.

Then commit the lockfile and run the audit. npm lockfiles keep the public
registry URL (`DEP-06`). Strip a private cache host, a loopback address or
an internal proxy if a cache wrote it in. Debug and test packages stay in
`require-dev` (`DEP-07`). Do not commit `composer.phar` (`DEP-08`).

A house package is not mandatory just because it exists. It is mandatory
once the project has chosen it: do not add a second library for the same job.

Versions for new work are `STACK-01`: PHP 8.5, Laravel 13, PostgreSQL 18,
Valkey 9, Node.js 24, Vue 3.5. An existing application may stay on the
minimum in that table. Do not upgrade a major in the same change as a
feature unless the task is the upgrade.

## Git

`GIT-01` to `GIT-04`. `main` accepts merge commits only, from a reviewed
merge request, with a green pipeline and resolved threads. The owner
merges. Rebase, squash and force-push are forbidden. `main` depends on
released versions of house packages.

| Project | Branch |
| --- | --- |
| Has a tracker key | `<KEY>-<slug>`, or the form the passport records |
| No tracker key | `feature/<slug>` for implementation |
| A design change | `design/<slug>` |

The commit subject is English. It is the tracker's subject form, or a
Conventional Commit. A task number goes at the end of the subject, because
a leading `#` is a comment in a commit message:

```
fix(projects): keep the archived flag on save (#22)
```

The body says what changed in one to three lines when the subject is not
enough. Do not commit secrets, dumps or internal host names.

## CI

The merge request pipeline is the gate. It runs format, types, tests,
coverage and audits for the code the change touches. End-to-end tests are
not part of that gate (`E2E-03`). A documentation-only change may skip the
code jobs. It may not skip a data-protection job.

A job that cannot run fails. It is not marked as allowed to fail, and the
threshold is not lowered to get a green board.

## Legal and platform terms

Work stays inside the law and inside the terms of the services it uses.
Official APIs and documented integrations are the path. Where a service has
no API and its terms forbid automation, a person does the step; the change
prepares the data or the instructions.

Grey areas are not "probably fine". Name the uncertainty and stop.

## Pulling these standards into a project

The project depends on this package and imports
`vendor/dskripchenko/laravel-standards/AGENTS.md` from its `AGENTS.md` and
`CLAUDE.md`. The line and the passport are in `templates/claude-import.md`
and `templates/project-passport.md`. Text after the import overrides and
extends the package (`CORE-01`). Do not copy the standards into the
application.

This package's own versions follow `STD-01`. The passport records the
version the project follows.
