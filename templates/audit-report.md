# Standards audit

- Project:
- Date:
- Standards version:
- Shape from the passport:
- Auditor: a person, or the tool that read the tree

This report does not change code. `quick` means a small follow-up task,
not a change made while writing the report.

| Code | Status | Evidence |
| --- | --- | --- |
| CORE-04 | met | `AGENTS.md` passport |
| DB-01 | violated | tests use a different engine than production; path: `phpunit.xml` |
| DEP-07 | quick | a debug package is in `require`; path: `composer.json` |

Status is `met`, `violated`, `quick` or `n/a`.

## Not run

Which checks were not executed, and why.

## Not changed

What the audit saw and left alone.
