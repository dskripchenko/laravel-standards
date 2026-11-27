# Testing

Tests are part of the change, not a follow-up. They run against the same
engine and major version as production (`DB-01`). SQLite is forbidden.

A new application, and a domain after `DOM-01`, gates on `TEST-01`: 80%
lines of project PHP, 70% lines of UI that has logic. An older application
gates on `TEST-02`: at least 70% of the changed executable lines in each
coverage report, and the repository's total coverage does not go down.
Diff coverage is covered changed executable lines divided by all changed
executable lines, multiplied by 100. A report with no changed executable
lines is `n/a`, and the percentage is not rounded up. The passport names
the diff command. End-to-end tests are not part of either percentage
(`e2e.md`).

## Backend

A new project and a handbook-shaped project use Pest (`PHP-06`). A project
that already uses PHPUnit keeps it. New PHPUnit tests use `#[Test]` and
`snake_case` method names.

Feature tests use `RefreshDatabase`. Data comes from factories. Mail,
HTTP, queues and notifications are fakes. A test arranges its own state.

```php
<?php

declare(strict_types=1);

describe('project archive', function () {
    it('hides an archived project from the default list', function () {
        $project = Project::factory()->create(['archived_at' => now()]);

        $this->actingAs($this->viewer())
            ->getJson('/api/v1/projects/list')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonMissing(['id' => $project->id]);
    });
});
```

Pest names are English sentences. A PHPUnit method name is `snake_case`
(`PHP-06`). One behavior per test. At least one assertion.
Do not sleep. Move the clock with `Carbon::setTestNow()` when time matters.
Do not call a private method; exercise the public behavior.

Minimum for a new endpoint: the success path, a validation failure, and an
authorization failure. A policy has an allow and a deny. An action has a
test for the outcome it claims.

Do not test Eloquent's `save`, a migration, a config file or a third-party
package. An Orchid screen is tested for its permission only.

The 80% line gate is `TEST-01`: a new application, and a domain after it
has moved. An older application follows `TEST-02` instead, and this
paragraph's 80% does not replace that. The coverage include path is `app/`.
Framework stubs the project has not edited may be excluded, with a comment
that says they are stubs. The moment the project edits the file, the
exclusion goes away. `bootstrap/`, `config/`, `routes/` and `database/` are
outside the percentage. Do not drop the percentage to make a change pass.

## Frontend

Vitest and Vue Test Utils. Tests sit where the project already puts them
(`frontend/tests/` or `src/**/__tests__/`). A component with logic, a
composable and the API client are covered. A presentational wrapper around
a kit component is not a coverage target.

70% of UI that has logic is the `TEST-01` gate. An older application
follows `TEST-02` for the lines the merge request changes.

The API client is tested with a mocked `fetch` or Axios, not with a live
server. Assert the response shape the project uses (the envelope, or the
API resource), the CSRF header on writes, and the error type.

## Static analysis and format

A change is not done until, for the languages it touches:

- the project's formatter (`PHP-02`): `vendor/bin/pint --test` where the
  project uses Pint, phpcs where it still uses phpcs
- Larastan at the project's level (`max` on a new application)
- `vue-tsc --noEmit`
- the project's ESLint script

Before changing behavior that has no test, pin the current behavior with
a characterization test (`recipes/characterization-test.md`).

## Gates

A check the passport lists that did not run is a failure. End-to-end tests
are not that list (`E2E-03`). Do not set `allow_failure`, do not append
`|| true`, and do not pass `--ignore-unreachable` to `composer audit`.
A flaky test is fixed before the next task, not retried until it happens to
pass.

The merge gate is the merge-request pipeline, not a branch pipeline that
nobody looks at. Documentation-only changes may skip code checks. A
data-protection check does not get skipped.
