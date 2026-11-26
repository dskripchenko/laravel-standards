# Moving a product into a domain

The rules are `DOM-01` to `DOM-03`. This chapter is the order of the work.

## The map

`docs/domain-map.md` in the application lists each product that still
lives outside `app/Domain/<Product>`:

| Column | Meaning |
| --- | --- |
| Product | The name the business uses |
| Lives in | The folders today |
| Target | `app/Domain/<Product>` |
| Depends on | Other products that must move first, or "none" |
| Risk | What a caller will notice if the move is wrong |

The template is `templates/domain-map.md`. One row becomes one task. A
feature task absorbs the move only when it already rewrites that product.

A new product does not appear on the map as a future move. It is created
in `app/Domain/<Product>` (`DOM-02`). A new outbound system is created
in `app/Integrations/<System>`.

## Order inside one move

1. Agree the row. The passport stays on the current shape until the
   move is done. The move does not switch a legacy application to the
   handbook base classes, and it does not switch a handbook application
   to the forge controllers, unless the ADR says so.
2. Add characterization tests for the behavior you will touch
   (`recipes/characterization-test.md`). They pass before the files move.
3. Move the code. Public HTTP paths, queue class names (`JOB-02`),
   scheduled commands and config keys stay stable or gain aliases.
4. Add an architecture test that the domain does not reach into another
   product's internals, and that `app/Integrations/<System>` is the only
   place that knows that system's wire format.
5. Coverage of the moved domain follows `TEST-01` from then on. The rest
   of the application stays on `TEST-02` until it moves.

## What the move does not include

A PHP upgrade, a database engine change, a formatter change, or a new
admin package. Each of those is its own task and, for the engine, an ADR
(`DB-01`).
