# Playwright

Playwright automation Framework

## Running the end-to-end tests

Use the `run-e2e.sh` script to install required browsers and execute the tests:

```bash
./run-e2e.sh
```

Pass additional arguments to forward them to `playwright test`:

```bash
./run-e2e.sh tests/dummy_e2e_demo_ai.js --project=Chrome
```
