# New endpoint

Forge shape, `dskripchenko/laravel-api`. Elsewhere, follow the shape file
and keep this recipe's tests and docblock.

1. Before adding a public route, obtain the owner's approval (`CORE-08`).
2. Confirm the action name (`API-04`): `list`, `show`, `save` or the
   project's `create`/`update`, `delete`, or one camelCase domain verb.
3. Add the right in the shape's one rights place (`SEC-04`) before writing
   the body.
4. Validate every input. Map a domain refusal to `errorKey` and
   `lang/*/refusals.php` (`shapes/forge.md`).
5. Write the docblock: a summary line, `@input`, `@output` (`API-03`).
6. Return the envelope helper. Do not build a second JSON shape.
7. Tests (`TEST-04`): success, validation failure, authorization failure.
   Fakes for mail, HTTP and queues. The production database engine.
8. If the response changes a contract an existing client uses, stop
   (`CORE-08`).
