# Form and end-to-end scenario

1. Build the control with the kit (`FE-02`). New style is BEM and SCSS,
   using the kit's custom properties (`FE-03`).
2. User-visible strings go through i18n (`LANG-01`). The product name
   comes from `config('app.name')` or i18n (`LANG-02`).
3. Add `data-testid` on each new field and button. Update the catalogue
   (`templates/data-testid.md`, `E2E-02`).
4. Add or update the scenario in the e2e project. Python, unless the
   passport says the forge TypeScript runner (`E2E-01`). The scenario
   does not import application code.
5. Commit the scenario separately from the product code, in the same
   merge request.
6. Run it once against a stand. Write the command and the outcome in the
   merge request (`E2E-04`). If the stand is unavailable, record the reason
   instead. Put an unresolved failure in the findings file and a product
   defect in the tracker. Do not paste a secret or a personal record.
7. A unit or feature test still covers the server rule the form depends
   on. The scenario does not replace it (`TEST-04`).
