# Characterization test

Use this before changing behavior that has no test, especially in a
legacy application (`TEST-02`).

1. Call the public entry the user hits: an HTTP route, an Artisan command
   or a public method. Do not call a private method.
2. Assert the current observable result, including the awkward parts. The
   test records what the code does today.
3. Use a factory or a synthetic fixture. Use the production database
   engine. Fake outbound HTTP.
4. See the test pass on the unchanged code.
5. Then change the behavior. Update the assertion in the same change if
   the new behavior is the task. Leave the assertion if the task is a
   move that must preserve behavior (`docs/domains.md`).
