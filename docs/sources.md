# Sources

The rules in this package were taken from two practices that already agreed
on most of the stack and disagreed on the shape of an application. The
disagreement is recorded as four accepted shapes (`SHAPE-01`). It is not
papered over.

## The house handbook

The handbook is the set of rules for applications that use layer base
classes, Orchid and Feature-Sliced Design. Where this package and that
handbook both speak, a handbook-shaped project follows its handbook and
its own ADR (`CORE-01`). This package is the base underneath.

The handbook's git practice (merge commits, no rebase, no squash) and its
documentation sections are the origin of `GIT-01` and `DOC-02`.

## House applications and packages

The forge shape is the shape of the house applications that use
`app/Domain`, `app/Api` and `dskripchenko/laravel-api`. The laravel-admin
shape is the shape of applications built on `dskripchenko/laravel-admin`.
The legacy shape is the shape of older applications that group code by
technical role and are not being rewritten inside a feature task.

Packages that already cover a job are listed in `DEP-04`. Their own
repositories remain the source for how that package is called. This
package only says when to reach for them.

## What stays out of this package

Host layout, ports, which container runs which service, and the text of
internal ADRs stay in the place that operates them. A coding rule that
those documents also state (pinned images, secrets outside git and outside
command arguments, OSI licenses unless the owner records an exception, no
SQLite, Valkey behind the Redis protocol, the law and the terms of every
external service) is restated here so a project that is not deployed there
still has it.
