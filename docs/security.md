# Security

These rules apply on top of the framework's defaults. Turning a default off
is a project override (`CORE-01`), written in the passport or an ADR. It
is not a silent change in one call site.

## Secrets and personal data

A secret is read from the environment inside a config file and nowhere else.

```php
// config/services.php
return [
    'gitlab' => [
        'token' => env('GITLAB_TOKEN'),
    ],
];
```

```php
$token = config('services.gitlab.token');
```

Do not call `env()` from a controller, a job, a test helper or a Vue file.
Do not commit `.env`, a key, a certificate or a dump. `.env.example` lists
every key with an empty value.

Do not log a password, a hash of a password, a token, a card number, or a
government identifier (`SEC-03`). A log line carries an identifier, the
outcome and the request id. Validation logs record which fields failed, not
the values the person typed.

`SEC-07`. Personal data is masked in logs, in mail and in an admin list
that is not the record's own screen. The product records how long each
kind is kept, and deletes or anonymizes it when that time ends. Reading
or changing a personal record writes an access journal entry: who, when,
which record, what happened. A secret scanner such as gitleaks runs
before a commit.

Examples, fixtures, screenshots, end-to-end data and docs use synthetic
values. A real personal record in a commit is an incident, not a review
comment.

## Authentication and authorization

Passwords are `Hash::make` and `Hash::check`.

Every state-changing route checks a policy or the project's right on the
server. A hidden button is not a check. An id in the query is not proof of
ownership: the query is scoped to the caller.

Cookie-authenticated routes keep CSRF. A same-origin SPA uses Sanctum's
session and the `XSRF-TOKEN` cookie. A token for a machine has abilities
limited to what that machine does, and it can be revoked.

Authentication endpoints and public writes are rate-limited.

## Input and output

Mass assignment uses `$fillable` or `$guarded = ['id']`. `$guarded = []` is
forbidden.

SQL values are bound. A shell command does not interpolate user input;
pass an argument list. A file the user uploads is stored under a generated
name, with an allow-list of types and a size limit.

`v-html` does not render text the user supplied, unless that field already
goes through the project's sanitizer and the task is that field.

An outbound request uses a host the application expects. A URL from the
request is checked against an allow-list before it is fetched.

API errors do not include a stack trace, a SQL string or a secret. Production
runs with `APP_DEBUG=false`. Debug dashboards are not reachable without
authentication.

## Supply chain

`composer audit` and `npm audit` are merge gates. An unresolved high or
critical advisory blocks the change. Do not pass a flag that turns an audit
failure into a success.

Dependencies are OSI-licensed. Anything else needs the owner's ADR.

Lockfiles do not contain a private cache host, a loopback address or an
internal proxy (`DEP-06`). The public registry URL stays in the file.

## Invariants that bind application code

- Image versions are pinned (`STACK-02`).
- Secrets are not command-line arguments (`SEC-02`).
- A new public route is an explicit decision (`CORE-08`), not a default.
- The terms of GitHub, GitLab, npm, Packagist and any other service you call
  are part of the task (`CORE-02`). Official APIs only. No bypass of access
  control.
