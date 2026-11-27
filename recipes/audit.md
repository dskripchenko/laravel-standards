# Audit a project

The report uses `templates/audit-report.md`. It stays in the application
repository. It does not change production code. It does not go into this
package.

1. Read the passport. If it is missing, draft one only from facts found in
   the repository. Leave unknown fields empty and show the draft to the
   owner. Do not guess or rely on the passport before the owner confirms it
   (`CORE-04`).
2. Walk the rule codes in `AGENTS.md`. For each code record one of:
   `met`, `violated`, `quick` (a small separate task would fix it), or
   `n/a` with the reason (the shape does not use it, or `CORE-06`).
3. Cite a path for every `violated` and `quick` row. Do not cite a secret,
   a personal record or an internal host.
4. Do not fix the rows in the same task unless the owner asked for the
   fixes. A `quick` row is a proposal, not permission.
5. End with `CORE-09`: what you opened, what you did not run, what you
   did not change.
