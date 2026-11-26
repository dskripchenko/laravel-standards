# PHP

`STACK-01` and `PHP-01` to `PHP-06`. Target PHP 8.5 for new code. An
existing application on 8.4 or 8.3 stays there until its upgrade, and new
code in it uses only what that version has. PHP 8.2 is not a target for
new work. PHP below 8.2 is outside this standard (`CORE-06`).

Laravel 13 is the framework for a new application. A package declares the
Laravel versions its tests actually run.

## Tooling

A project keeps its formatter (`PHP-02`). Pint, for a new project and for
a project that already runs it, uses the Laravel preset and strict types:

```json
{
    "preset": "laravel",
    "rules": {
        "declare_strict_types": true
    }
}
```

Larastan at `level: max` for a new application. An existing application keeps
its level and does not drop it. Paths include `app/` and `tests/`.

Every file:

```php
<?php

declare(strict_types=1);
```

## Types and control flow

Strict comparison. `match` when each arm produces a value. `??` for absence.
Named arguments when two parameters share a type.

```php
$label = match ($status) {
    OrderStatus::Pending => 'Pending',
    OrderStatus::Paid => 'Paid',
};
```

```php
enum OrderStatus: string
{
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Paid = 'paid';
}
```

Constants are typed and `UPPER_SNAKE_CASE`. Enum cases are PascalCase. Do not
encode a closed set as class constants.

Constructor promotion for dependencies and for immutable data:

```php
final class ArchiveProject
{
    public function __construct(
        private readonly Clock $clock,
    ) {}
}
```

A function that takes a boolean to switch jobs is two functions. A chain of
`instanceof` that picks a behavior is a missing method on those types.

Do not write a global function. The singleton pattern is forbidden
(`PRIN-05`): no `getInstance()`, no static mutable state. The container's
`singleton()` binding is allowed. Tests replace the binding.

A new line stays within 120 characters (`PRIN-06`). A file that already
uses a higher limit keeps that limit until a formatter migration is the
task.

## State

Fields that callers must not change are `private`. A model uses `$guarded`
or `$fillable` and never `$guarded = []`. Public mutable properties on a
service class are a defect.

Prefer composition. Inherit only when the parent is a framework class or a
project base class that the shape requires.

## Comments and dead code

PHPDoc is English and exists so a tool can see types the signature cannot
express (`@property` on a model, the shape of an array, `@input` / `@output`
on an API method). A line comment explains a constraint. Commented-out code
is deleted, not preserved.

## What Pint does not decide

Pint will not choose a name. Names are English words for the thing: `$project`,
not `$p`; `archive()`, not `handle()`. A collection is plural, one record is
singular. Do not repeat the class name in a property (`Project::$projectName`
is `$name`).
