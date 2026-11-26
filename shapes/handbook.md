# Handbook shape

Read this when the passport says `handbook`, or when `SHAPE-01` detects
it. The generic rules stay in `AGENTS.md`. This file is the part that is
true only for this shape.

## How you know

```
app/Actions/
app/Builders/
app/Data/
app/Models/
app/Services/
app/Orchid/Sections/
```

`SHAPE-01` matches this shape on `app/Actions`, `app/Builders` and
`app/Data`. Orchid without those three folders is the legacy shape.

The repository also has the layer base classes: `BaseController`,
`BaseModel`, `BaseService`, `BaseAction`, `BaseBuilder`, `BaseData`.

## Layers

Every concrete class extends the layer's abstract base and is `final`.

| Layer | Base class | Holds |
| --- | --- | --- |
| `app/Http/Controllers` | `BaseController` | A Form Request, a policy, one action or service call, one response |
| `app/Models` | `BaseModel` | Relations, casts, fillable or guarded, PHPDoc, `newEloquentBuilder()` |
| `app/Builders` | `BaseBuilder` | Query methods that return `static` |
| `app/Actions` | `BaseAction` | One invokable business write |
| `app/Services` | `BaseService` | Rules that cross entities |
| `app/Data` | `BaseData` (`spatie/laravel-data`) | Input and output objects |
| `app/Http/Requests` | `FormRequest` | Validation and, for non-resource actions, authorization |
| `app/Policies` | — | One policy per model |

A controller method is those few lines. Dependencies of a controller come
through the method, not the constructor. `authorizeResource()` in the
constructor is the one allowed constructor use.

A model is structure only. No scopes, no query methods, no business rules.
`Model::where(...)` in a controller or a service is forbidden. Call a
builder method.

API responses use Eloquent API Resources. Validation is a Form Request,
not `$request->validate()` in the controller. Authorization is a Policy.

## Tests

Pest (`PHP-06`). Feature tests go through HTTP or through the action's
public invocation, against the production database engine (`DB-01`).

## Admin

Orchid, as in `ADM-02`. Do not add `dskripchenko/laravel-admin` beside it.

## Frontend

Feature-Sliced Design and Axios, as in `FE-04`. End-to-end tests are
Python (`E2E-01`).

## Long HTTP calls

When the application already depends on
`dskripchenko/laravel-delayed-process`, a call that outlives the HTTP
request stays on that package: the class is on the allow-list, the
response is a UUID, the handler is safe to run twice, and the client
polls. Do not add a second polling protocol for one feature.

## What does not belong here

A forge-style `app/Domain` tree introduced in the same change as a
feature, a second data package beside `spatie/laravel-data`, and a
repository interface that only wraps the builder.
