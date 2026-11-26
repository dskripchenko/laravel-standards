# Domain map

One row is one task (`DOM-01`). The template columns are explained in
`docs/domains.md`.

| Product | Lives in | Target | Depends on | Risk |
| --- | --- | --- | --- | --- |
| Example | `app/Services/Example` | `app/Domain/Example` | none | HTTP paths stay. Queued jobs need a class alias. |
