# Packages we publish

`PKG-01`. A house package is a library other repositories require. It is
not an application, and it is not this standards package. This standards
package stays documents only (`STD-03`).

## Runtime

`composer.json` declares the PHP constraint the tests actually run. The
floor for a new package is `^8.2`. A package that must serve older
applications lists the Laravel versions its CI runs, and does not claim
a wider range.

The package does not require SQLite. Tests that need a database run on
the engines the package claims to support (`DB-01` for an application;
for a package, the engines named in the README).

## Tests and analysis

PHPUnit or Pest, one of them, the one the package already uses. A new
package uses Pest. Larastan runs in CI. A baseline file is allowed and
only shrinks: a change that adds an ignored error is a failed change.

## Automation and security

GitHub Actions runs the tests, Larastan and `composer audit` on the
merge request.

`SECURITY.md` tells a person where to report a vulnerability. It does
not contain a key, a customer name or an internal host.

The README of a public package is English (`LANG-01`). Translations, when
the package keeps them, sit beside it (`docs/ru`, and further languages
the package already has). A changelog follows Keep a Changelog. Versions
follow `STD-01` when the package's own rules change, and ordinary
semantic versioning when its code changes.

## What does not go in the repository

A committed `composer.phar` (`DEP-08`). A debug package in `require`
(`DEP-07`). A lockfile URL that points at a private cache (`DEP-06`).
A copy of these standards. The package's `AGENTS.md` imports this
package (`templates/claude-import.md`) and adds a passport.
