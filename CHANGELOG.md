# Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-27

### Added

- Initial standards for PHP, Laravel and Vue, drawn from the house handbook
  and from the house applications and packages.
- `AGENTS.md` as the file a model reads before changing a project.
- English chapters in `docs/` and the Russian translation in `docs/ru/`.
- Team installation through the Git repository and a released tag before
  Packagist publication.
- Agent compatibility verification and an explicit read fallback for agents
  that do not expand `@` imports.
- Documentation CI for local links, rule codes, translations, JSON and TOML.

### Changed

- `TEST-02` now defines the 70% diff-coverage formula, its zero-line case
  and its no-rounding rule.
- `E2E-03` and `E2E-04` distinguish delivery evidence from a merge gate and
  define how to record a failed or unavailable local run.
- The PHP chapter names the handbook controller exception to constructor
  injection.
- The package is the base. A project's ADR, `AGENTS.md`, `CLAUDE.md` and,
  for a handbook project, the house handbook override and extend it.
- Four shapes: forge, handbook, laravel-admin and legacy, each in `shapes/`.
- Rule codes (`DB-05` and the rest) for reviews, reports and overrides.
- A project passport, a stop-and-ask list, a readiness report, and the rule
  that foreign text is data.
- Versions split into a target for new work and a minimum for existing
  applications. PostgreSQL for new applications; an existing engine,
  including MySQL, stays until an ADR. SQLite stays forbidden.
- End-to-end tests in Python (pytest-playwright, Allure), with TypeScript
  `@playwright/test` kept for the forge shape. They do not block a merge.
- Coverage: 80/70 for a new application and for a domain after it moves;
  diff coverage for an older application, and total coverage does not drop.
- Domain moves are their own tasks, tracked in `docs/domain-map.md`.
- BEM and SCSS with the kit's custom properties for new styles.
- Safe changes to live tables, queues, outbound calls, personal data,
  flags, logs and cache.
- Git: a tracker key when the project has one, otherwise `feature/`.
  Subjects are the tracker form or Conventional Commits.
- Formatter: the project keeps its own. Pint is the default for new work.
  Pest for new and handbook projects. PHPUnit stays where it already is.
- The singleton pattern is forbidden. A container `singleton()` binding is
  allowed. New lines stay within 120 characters.
- Copy templates in `templates/` and procedures in `recipes/`.
- Versions of this package: a new requirement is minor, a relaxed
  requirement is major.

### Fixed

- The audit recipe no longer allows guessed passport facts (`CORE-04`).
- `DB-04` now limits the written `SELECT *` prohibition to raw SQL, and
  `DB-05` names the additive-change exception already shown in its chapter.
- The endpoint recipe includes owner approval for a new public route.
- The migration recipe names the timestamp exceptions correctly.
- The ADR template includes the author, and the existing PHPStan template no
  longer contains commented-out configuration.
- Russian translations and the frontend configuration templates are aligned
  with the English rules.
