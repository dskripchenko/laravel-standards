# Project passport

Paste under the import in the project's `AGENTS.md`. Delete rows that do
not apply only after you are sure. An empty cell means "stop and ask"
(`CORE-04`), not "pick the usual".

| Fact | Value |
| --- | --- |
| Standards | `dskripchenko/laravel-standards` @ `<version>` |
| AI agents | Compatibility record from `agent-compatibility.md` or its location |
| Shape | `forge` \| `handbook` \| `laravel-admin` \| `legacy` |
| PHP / Laravel | |
| Database | engine and major version, same in tests and production |
| Formatter | `pint` or the command the repository runs |
| Line length in old files | 120, or the limit the formatter already enforces |
| Tests | `pest` or `phpunit` |
| Coverage | `TEST-01` or `TEST-02`, and the diff command |
| End-to-end | `python` or `forge-playwright`; folder `tests/e2e` or `qa/` |
| Tracker key | prefix, or "none" |
| Branches | the form of `GIT-02` this project uses |
| Docs language | `LANG-01` for this project |
| ADR folder | |
| Check commands | format, phpstan, tests, vue-tsc, eslint, audits |
