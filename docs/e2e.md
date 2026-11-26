# End-to-end tests

The rules are `E2E-01` to `E2E-04` in `AGENTS.md`. This chapter is how to
apply them.

## Where they live

In the product repository, as a project that does not import the
application:

```
tests/e2e/          # or qa/, the one the repository already has
  pyproject.toml
  uv.lock           # or the lockfile the project already commits
  conftest.py
  scenarios/
  pages/
  docs/data-testid.md
  docs/findings.md
  docs/coverage-plan.md
```

The forge shape is the exception (`E2E-01`). There the runner is
`@playwright/test` in TypeScript, including the first suite. The rest of
this chapter still holds: a separate commit, `data-testid`, no merge gate,
one recorded run.

Python projects use pytest, pytest-playwright and Allure. A starting
`pyproject.toml` is in `templates/e2e-pyproject.toml`. Pin the versions
the project actually installs, and commit the lockfile.

## What a scenario may know

The stand URL, from the environment. The `data-testid` values, from
`docs/data-testid.md` in that e2e project. Synthetic users. Nothing else.
No model class, no Vue component, no SQL.

A new field or button gets a `data-testid` that says what it is
(`project-name`, `archive-submit`). The catalogue gains a line in the
same change. The template is `templates/data-testid.md`.

## When they run

A tester, locally:

| Command intent | What runs |
| --- | --- |
| smoke | the short path of one product |
| regress | the regression set of one product |
| all | every scenario of one product |

The base URL is an argument or an environment variable, not a host
written in the test. A scheduled run is a later step. CI runs the suite
only as a stage the project turns on (`E2E-03`). A red end-to-end stage
that the project has turned on is a failure. A stage that does not exist
is not a waiver of `E2E-04`.

## What the author of a UI change delivers

In the same merge request, as its own commit:

1. The scenario, added or updated.
2. The new `data-testid` values and the catalogue line.
3. A note of one local run: the stand URL's environment name, the
   command, and the outcome. Do not paste secrets or personal data.

A failure found while writing the scenario goes to `docs/findings.md`
(`templates/e2e-findings.md`) when it is not fixed in this merge request.
A product defect is a tracker issue. The finding file does not replace
the issue.

## Flags

A scenario that must force a variant uses the project's test header and
the debug token from the environment (`FLAG-02`). The suite does not
contain the token. Production stands do not accept the header.

## Coverage plan

`docs/coverage-plan.md` in the e2e project lists products and the
scenarios they should have. It is a plan, not a gate. The template is
`templates/coverage-plan.md`.
