# Forge shape

Read this when the passport says `forge`, or when `SHAPE-01` detects it.
The generic rules stay in `AGENTS.md`. This file is the part that is true
only for this shape.

## How you know

```
app/Api/<Version>/
app/Domain/<Context>/
app/Http/
app/Integrations/
app/Console/Commands/
app/Providers/
frontend/
```

There is no root `app/Actions`, `app/Builders`, `app/Data` or `app/Orchid`.
Do not add them.

## Model and operation

A model is a `final` class extending `Illuminate\Database\Eloquent\Model`,
in its domain namespace. It has a PHPDoc `@property` block, casts through
`casts()`, and `$guarded = ['id']`. It does not contain a workflow.

An operation that is more than a query sits beside the model, as a class
or a small set of classes named after the operation. Controllers stay
thin: authorize, validate, call the domain, return the envelope.

JSON at the boundary is camelCase. Columns are snake_case. The model maps
them in one place (`toPayload()` or the equivalent the project already
has).

## API

`API-01` through `API-06` are this shape's HTTP rules. The recipe is
`recipes/new-endpoint.md`.

## Refusal

A domain operation that rejects a case returns a refusal, not a thrown
string and not a boolean. The refusal carries an `errorKey`. The text a
person sees lives in `lang/*/refusals.php` under that key. The controller
maps the refusal onto the package's `error()` response. Do not put the
sentence in the domain class.

## Rights

Rights for this shape live in one class, `Domain\Access\Rights`, and are
enforced through the project's `RequireRight` middleware or the equivalent
it already has. A new state-changing route adds its right there and checks
it before the domain runs (`SEC-04`). Do not start a second list in a
controller.

## Audit

A write that changes stored data records who did it, through which channel,
and on what basis. The project has one place that writes that record.
Call it. Do not invent a parallel log for one feature.

## Frontend

The forge layout in `FE-04`. Do not add Axios or Pinia. End-to-end tests
use TypeScript `@playwright/test` (`E2E-01`), including the first suite.

## Processes

A forge application that already depends on
`dskripchenko/laravel-process-engine` models a long-running business
process as a versioned statechart. Effects declare whether they may be
retried. Operator actions go through the engine's API and record the
actor and the reason. Do not also model that process as a pile of status
columns and ad hoc jobs.

A forge application that does not already depend on the engine does not
gain it as a side effect of an ordinary feature (`JOB-04`).

## What does not belong here

Orchid, `spatie/laravel-data`, a repository interface per model, and the
handbook base classes.
