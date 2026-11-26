# Database

`DB-01` to `DB-06`. A new application uses PostgreSQL. An existing
application keeps the engine production already runs, including MySQL.
Tests, CI and production use the same engine and the same major version.
SQLite is forbidden, including in memory, because types, indexes and locks
do not match. Moving an existing application to PostgreSQL is an ADR.

A new application uses Valkey for the cache, the session store and the
queue, through Laravel's `redis` driver (`STACK-04`). The variables stay
`REDIS_*`. That name is the client, not the server. An application that
already uses another cache keeps it until an ADR moves it.

## Names

| Thing | Form | Example |
| --- | --- | --- |
| Table | plural snake_case | `order_items` |
| Pivot | two singular names, alphabetical | `role_user` |
| Column | singular snake_case | `gitlab_path` |
| Primary key | `id` | `id` |
| Foreign key | `{model}_id` | `project_id` |
| Boolean | `is_`, `has_`, `can_` | `is_active` |
| Timestamp | `*_at`; `timestamptz` on PostgreSQL | `archived_at` |
| Index | `{table}_{columns}_{suffix}` | `projects_name_index` |

No `tbl_` prefixes and no quoted identifiers. A new PostgreSQL schema does
not use MySQL-only types (`TINYINT`, `AUTO_INCREMENT`, backticks). An
application that already runs MySQL keeps that engine's types (`DB-01`)
and does not declare a column as `timestamptz`.

Money is `numeric` / `decimal`. A string with no real limit is `text`. A
string with a limit uses that limit, not a reflex `varchar(255)`.

## Migrations

Anonymous class, `up` and `down`. A comment on every column except `id`,
`created_at`, `updated_at` and `deleted_at`. The sample is PostgreSQL.

```php
<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Display name');
            $table->string('gitlab_path')->unique()->comment('GitLab path, products/<name>');
            $table->timestampTz('archived_at')->nullable()->comment('When the project left the default list');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
```

A status column is a string plus a PHP backed enum cast. The comment lists
the values. Do not add a PostgreSQL `ENUM` type unless the repository
already uses one.

On PostgreSQL, GIN, partial and expression indexes go through
`DB::statement`, with a matching `DROP INDEX` in `down`:

```php
DB::statement(
    'CREATE INDEX projects_name_active_index ON projects (name) WHERE archived_at IS NULL'
);
```

## Queries

Eloquent and the query builder first. A raw statement is for SQL the builder
cannot express, with bound parameters.

- List the columns you need when a raw query is required. No `SELECT *`.
- Do not wrap an indexed column in a function inside `WHERE`.
- Paginate large tables by keyset, not by a growing offset.
- `with()`, `loadMissing()` and `withCount()` for relations. A lazy load is
  a defect. Turn on `Model::preventLazyLoading()` outside production.
- `NOT EXISTS` instead of `NOT IN` over a set that may contain null.

JSON in a column is `jsonb` and only for data that is not queried as
relations. If you filter on the structure, it wants a table or an ADR that
explains the `jsonb`.

## Live data

`DB-05`. A table that already holds rows changes in three releases when the
change is not purely additive:

1. Expand. Add the new column or table as nullable, or with a default the
   old code can ignore. Deploy code that writes both shapes.
2. Backfill. Copy rows in a job or a command, in batches, outside the
   schema migration. The job is safe to run twice (`JOB-01`).
3. Contract. In a later release, after every reader uses the new shape,
   drop the old column or add the `NOT NULL`.

An index on a large PostgreSQL table is `CREATE INDEX CONCURRENTLY`, in a
migration that disables the wrapping transaction
(`public $withinTransaction = false` on PostgreSQL). The matching `down()`
drops that index. Production deploy does not run `down()`. `down()` exists
so a branch that has not reached production can roll back.

## Transactions

A write that touches more than one table is a transaction. Catch the failure
where a caller can retry or refuse, and roll back. Do not ignore a failed
transaction.
