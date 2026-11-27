# Adopt the standard

1. Install `dskripchenko/laravel-standards` from Packagist when available.
   Before then, configure the VCS repository and require a released tag as
   shown in `README.md`. Use a path repository only for local work on the
   standards. Do not add an autoload section or copy the markdown into the
   application.
2. Put the import from `templates/claude-import.md` at the top of the
   project's `AGENTS.md` and `CLAUDE.md`.
3. Fill `templates/project-passport.md` from the repository: shape, engine,
   end-to-end folder, tracker key, branches, docs language, ADR folder,
   formatter, check commands, agents and the installed version of this
   package. Put it under the import.
4. Verify every agent with `templates/agent-compatibility.md`. Add the
   explicit read fallback where the agent does not expand `@` imports.
5. If a fact is not in the tree, stop and ask (`CORE-04`: do not guess).
6. Run `recipes/audit.md` when the owner wants a baseline. The audit report
   stays in the application repository.
