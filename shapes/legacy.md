# Legacy shape

Read this when the passport says `legacy`, or when `SHAPE-01` reaches this
row: `app/Services`, `app/Components`, `app/Helpers` or `app/Traits`, and
no `app/Domain`. Laravel-admin, handbook and forge are tested first, so an
application that has those markers is not legacy. Orchid in this tree does
not make it handbook. The generic rules stay in `AGENTS.md`. This file
exists so a change does not reshape the tree.

## How you know

The code is grouped by technical role: controllers, models, services,
components, helpers, traits, and often a versioned API under
`app/Api`. Orchid may be present. The folders are the ones the
repository already has.

## How to change it

New code goes into the folder that already holds that kind of code, in
the style of the file next to it (`CORE-05`). A helper does not gain a
new responsibility. A new behavior is a class beside the code that uses
it, named for the operation.

Do not introduce `app/Domain`, handbook base classes, or a new admin
package inside a feature task. A move onto domains is `DOM-01` and
starts from `docs/domain-map.md`.

## Tests

Coverage of a change follows `TEST-02`: the lines the merge request
touches, with total coverage not going down. Before changing a behavior
that has no test, add a characterization test that records what the
code does now (`recipes/characterization-test.md`). Then change it.

`PHP-06`: if the repository's tests are PHPUnit, new tests are PHPUnit
with `#[Test]` and `snake_case` names. If they are Pest, they stay Pest.
The database in tests is the production engine (`DB-01`).

The formatter stays the project's formatter (`PHP-02`). A 180-character
phpcs line length stays until a Pint migration is the task. New files
you add still aim at 120 (`PRIN-06`) unless the project's formatter
rejects that and the passport says to follow the formatter.

## End-to-end

Python, in `tests/e2e` or `qa/` (`E2E-01`, `E2E-02`). Not a merge gate
(`E2E-03`). The task still adds the scenario, the `data-testid` values
and one recorded run (`E2E-04`).

## Long HTTP calls

When `composer.json` already requires
`dskripchenko/laravel-delayed-process`, a long call uses it (`JOB-04`):
allow-listed class, UUID, a handler that is safe to run twice, the
existing client interceptor. Do not add a second queue-and-poll path.

When the application has no such package, a long call is an ordinary
queued job (`JOB-01`) unless the task is to adopt the package. Adopting
it is a dependency (`CORE-08`) and needs the owner.

## What a legacy task does not do

It does not upgrade PHP or Laravel as a side effect (`CORE-06` when the
runtime is below the floor). It does not replace MySQL with PostgreSQL
(`DB-01`). It does not delete a second UI library that is still imported
(`DEP-10`). It does not commit `composer.phar` (`DEP-08`) and it does
not move `fakerphp/faker` in the same breath as a feature; that move is
its own small task (`DEP-07`).
