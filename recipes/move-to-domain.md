# Move a product into a domain

Follow `docs/domains.md`. This is the checklist for one row of the map.

1. The row exists in `docs/domain-map.md` and names the risk. The task is
   that row, not a feature that happens to touch one file (`DOM-01`).
2. Characterization tests pass on the old paths
   (`recipes/characterization-test.md`).
3. Move the code to `app/Domain/<Product>`. Keep HTTP paths. Add a class
   alias for any job still serialized under the old name (`JOB-02`).
4. Outbound calls for one system land in `app/Integrations/<System>`
   (`DOM-02`).
5. Add the architecture test from `docs/domains.md`.
6. Coverage of the moved domain is `TEST-01` from this change on.
7. Do not upgrade PHP, change the database engine, or switch formatter
   in this merge request.
