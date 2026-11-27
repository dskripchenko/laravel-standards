# Migration

1. If the table already has live rows and the change drops, renames or
   rewrites them, stop (`CORE-08`, `DB-05`). Agree expand, backfill and
   contract before writing the file.
2. Anonymous migration class, `up` and `down`. A comment on every new
   column except `id`, `created_at`, `updated_at` and `deleted_at` (`DB-03`).
3. Status values go in the column comment and in a backed enum on the model.
4. A large PostgreSQL index uses `CONCURRENTLY` and
   `$withinTransaction = false` (`docs/database.md`).
5. A backfill is a job that is safe to run twice (`JOB-01`), not a loop
   inside the schema migration.
6. `down()` is for a branch that has not reached production.
7. Update the model `@property` block and the ER diagram if the project
   has one (`DOC-01`).
