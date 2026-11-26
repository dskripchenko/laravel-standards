# New endpoint

Forge shape, `dskripchenko/laravel-api`. Elsewhere, follow the shape file
and keep this recipe's tests and docblock.

1. Confirm the action name (`API-04`): `list`, `show`, `save` or the
   project's `create`/`update`, `delete`, or one camelCase domain verb.
2. Add the right in the shape's one rights place (`SEC-04`) before writing
   the body.
3. Validate every input. Map a domain refusal to `errorKey` and
   `lang/*/refusals.php` (`shapes/forge.md`).
4. Write the docblock: a summary line, `@input`, `@output` (`API-03`).
5. Return the envelope helper. Do not build a second JSON shape.
6. Tests (`TEST-04`): success, validation failure, authorization failure.
   Fakes for mail, HTTP and queues. The production database engine.
7. If the response changes a contract an existing client uses, stop
   (`CORE-08`).
