# Operations

Queues, outbound calls, flags, logs and cache. The rule codes are
`JOB-*`, `INT-*`, `FLAG-*`, `OBS-*` and `CACHE-*`.

## Queues

A job that sends mail, calls a remote system or writes a row is written
so a second run does not double the effect. The usual shapes are a
unique key on the row, or a check that the work is already done.

```php
public int $timeout = 30;

public function retryUntil(): DateTimeInterface
{
    return now()->addMinutes(10);
}
```

`$timeout` is lower than the queue's `retry_after`. A job that runs
longer than `retry_after` is picked up twice while the first worker is
still inside it.

The constructor takes ids and scalars. The `handle` method loads the
models. A serialized Eloquent model is a stale copy, and it breaks when
the class moves (`JOB-02`).

```php
$schedule->command('reports:daily')
    ->dailyAt('06:00')
    ->withoutOverlapping()
    ->onOneServer();
```

## A long HTTP call

Prefer a queued job (`JOB-01`) unless the project already uses
`dskripchenko/laravel-delayed-process`. In that case the controller
returns the UUID the package issues, the class is on the allow-list, and
the existing frontend interceptor polls. See the shape file.

A durable business process with timers, waits and operator actions uses
`dskripchenko/laravel-process-engine` when the project already has it,
or when the task is to introduce it (`CORE-08` before the dependency).
The shape file `shapes/laravel-admin.md` is the home of the admin screens
for that engine. A forge application that already runs the engine follows
`shapes/forge.md`.

## Outbound calls

The client is constructed with a timeout. A retry wraps a call whose
method is safe to repeat (an HTTP GET that does not itself place an
order, a poll). A POST that charges or creates is not retried blindly.
The call log stores the operation name, the remote status and the
request id (`OBS-01`). It does not store a body that holds personal data
or a secret (`SEC-03`, `SEC-07`).

Tests bind a fake. One test uses a fixture copied from a real response
only after identifiers, names and document numbers are replaced with
synthetic values (`INT-02`).

The host comes from config. A host taken from the user is checked
against an allow-list before the client sees it (`INT-03`, `SEC-06`).

## Flags

```php
final class Experiments
{
    public function checkoutVariant(): string
    {
        return (string) config('experiments.checkout');
    }
}
```

Callers depend on `Experiments` (or the class the project already has).
A test forces a variant through the project's header only when the
debug token matches (`FLAG-02`). The production config has no token. A
test builds the application with an empty token and asserts the header
does nothing.

## Logs and cache

`OBS-02`. One structured log line per failure is enough when it carries
the request id and the domain id.

`CACHE-01`. Name the key and the TTL next to each other in config.
Invalidate with the mechanism the project already uses. A new trait
whose only job is to clear one more cache is the second mechanism the
rule forbids.
