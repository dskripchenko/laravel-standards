# Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-26

### Added

- Initial standards for PHP, Laravel and Vue, drawn from the house handbook
  and from the house applications and packages.
- `AGENTS.md` as the file a model reads before changing a project.
- English chapters in `docs/` and the Russian translation in `docs/ru/`.

### Changed

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
