# Adopt the standard

1. `composer require dskripchenko/laravel-standards`. Do not add an autoload
   section. Do not copy the markdown into the application.
2. Put the import from `templates/claude-import.md` at the top of the
   project's `AGENTS.md` and `CLAUDE.md`.
3. Fill `templates/project-passport.md` from the repository: shape, engine,
   end-to-end folder, tracker key, branches, docs language, ADR folder,
   formatter, check commands, and the installed version of this package.
   Put it under the import.
4. If a fact is not in the tree, stop and ask (`CORE-08` does not list this,
   but `CORE-04` does: do not guess).
5. Run `recipes/audit.md` when the owner wants a baseline. The audit report
   stays in the application repository.
