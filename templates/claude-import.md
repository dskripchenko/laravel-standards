# Import line

Put this at the top of the project's `AGENTS.md` and `CLAUDE.md`. The
passport from `project-passport.md` goes under it. Anything under the
import overrides and extends the package (`CORE-01`).

```markdown
@vendor/dskripchenko/laravel-standards/AGENTS.md

## Passport

<!-- paste templates/project-passport.md and fill it -->
```

An agent that does not support `@` imports needs the equivalent instruction
in its native instruction file:

```markdown
Before any work, read vendor/dskripchenko/laravel-standards/AGENTS.md and
follow it together with the passport and overrides below.
```

Do not copy `AGENTS.md` from the package into the project.
