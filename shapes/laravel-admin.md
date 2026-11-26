# laravel-admin shape

Read this when the passport says `laravel-admin`, or when `SHAPE-01`
detects `app/Admin` together with `dskripchenko/laravel-admin`. The
generic rules stay in `AGENTS.md`.

## How you know

```
app/Admin/Screens/
app/Admin/Resources/
app/Domain/            # when the application has grown domains
app/Models/
app/Processes/         # when the application runs process-engine
app/Http/
app/Providers/
```

A fresh skeleton may have `Admin`, `Models`, `Enums`, `Http` and
`Providers` only. Keep the folders the repository has. Add `Domain` when
`DOM-02` applies to a new product, not as a drive-by rename of `Models`.

Screens, resources and permissions follow `dskripchenko/laravel-admin`
and that package's own `AGENTS.md` when it ships one. Do not invent a
parallel screen layer. Do not add Orchid (`ADM-01`).

## Rights, refusal, audit

Where this application has grown a domain layer, rights, refusals and the
audit record follow the same idea as the forge shape:

- one rights class, checked before the write;
- a refusal with an `errorKey` whose text lives in `lang/*/refusals.php`;
- every data change records the author, the channel and the basis.

An application that still keeps those facts in the admin package's
permission keys uses those keys. Do not create a second rights list in
the same change that adds a screen.

## Processes

A long-running business process is a versioned statechart on
`dskripchenko/process-engine`, bridged by
`dskripchenko/laravel-process-engine`. Definitions live under
`app/Processes/`. Operator screens come from
`dskripchenko/laravel-admin-process`: instances, incidents, and actions
gated by a permission and recorded with a reason.

Effects declare whether they may be retried. An ambiguous side effect
becomes an incident a person resolves. It does not get a silent second
try.

Add the engine when the task is that process. Do not add it to display
a CRUD screen.

## Delayed HTTP

`JOB-04` applies when the application already uses
`dskripchenko/laravel-delayed-process`. The admin UI polls the UUID. It
does not block the screen on the long call.

## Frontend of the admin

The admin UI is the package's UI. A separate Vue SPA in the same
repository follows `FE-04` and does not reimplement admin screens.
