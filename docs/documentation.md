# Documentation

## Which language

`LANG-01`.

| Text | Language |
| --- | --- |
| Internal requirements, ADR, architecture notes, README | Russian |
| Public README and `docs/` | English. Translations sit beside them. Internal notes stay Russian. |
| Code, PHPDoc, JSDoc, comments, test names | English |
| OpenAPI descriptions | English |
| Diagram identifiers | English; labels may be Russian |
| This package's rules (`AGENTS.md`, `docs/`) | English |
| This package's translation (`docs/ru/`) | Russian |

Russian documents use ordinary words and the letter ё. Keep an English word
when it is a name in code, a product or an abbreviation (ADR, API, SQL,
OIDC). One meaning keeps one word across the documents. A claim has a
source, or it is marked as an assumption. Do not paste a customer's personal
data into `docs/`.

## What a change updates

| You changed | Also update |
| --- | --- |
| An endpoint | Its docblock (`@input`, `@output`) and the endpoint list if the project keeps one |
| A column | The migration `comment()`, the model `@property` block, the ER diagram if one exists |
| A decision a later change would have to undo | An ADR |
| An environment variable | `.env.example` and the README or env registry |
| A released package behavior | `CHANGELOG.md` |

Do not open a second documentation tree. Use the folders the repository
already has.

## ADR

`DOC-02`. The folder and the file name are the ones the project already
uses. A project that has none yet uses `docs/adr/ADR-###-slug.md`. The
number is the next free number. The language of the prose is `LANG-01`.
Sections, in order:

1. Metadata: id, author, date, status.
2. Context: the situation, with the requirements it serves.
3. Decision: what was chosen.
4. Reasons: which requirement or constraint made this the choice.
5. Alternatives: the chosen option and at least one rejected option, each
   with a cost.
6. Consequences: what becomes easier, what becomes harder, what is now forbidden.

Link by id (`ADR-004`), not by a line number. Do not link an ADR that has
no file yet.

## Changelog

Packages use [Keep a Changelog](https://keepachangelog.com/en/1.1.0/):
`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security` under
`[Unreleased]`, then a version and a date when the release is cut.
Versions of a package's code are semantic. Versions of this standards
package also follow `STD-01`: a new requirement is a minor version, a
relaxed requirement is a major version, and a clarification is a patch.

## README of a product

State what the thing is, how to install it, how to configure it, and which
environment variables it reads. Commands are copyable. A variable table has
the name, the purpose and whether it is required.

## Diagrams

Mermaid for structure, sequence and entity relationships. BPMN sources stay
next to the markdown when the project documents a process. A diagram has a
title. Update it in the same change as the structure it describes.

## This package

`AGENTS.md` is the file models must follow. `docs/` explains the same rules
with examples. `docs/ru/` is the translation for people. Do not grow a rule
only in the translation. Change `AGENTS.md` and the English chapter first,
then the Russian chapter in the same change.
