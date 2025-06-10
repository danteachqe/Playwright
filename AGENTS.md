# AGENT Instructions

This repository contains a Playwright-based automation framework.

Key elements include:

- Test execution script `run-e2e.sh` installs dependencies and runs Playwright tests.
- Playwright configuration `playwright.config.js` defines test directories, projects (Chrome, Firefox, Edge, Android, iPhone) and reporters.
- Page Object classes are located in `Pages/` (e.g., `HomePage.js`, `FlightsPage.js`, etc.) for actions on the BlazeDemo site.
- Automated tests reside under `tests/` (e.g., `demo.js`, `demo_ai.js`, `skip_clock.js`, etc.).
- Test data files can be found in `data/`.

## Testing
- Install dependencies with `npm ci`.
- Run tests with `npx playwright test`.
- HTML and other reports are generated under `reports/`.

## Guidelines
- Do **not** commit secrets such as tokens. Use environment variables instead.
- Avoid committing `node_modules`, reports, screenshots, or other generated artifacts.
- Placeholder files like `.gitignore` or `LICENSE` may need cleanup.

Use `playwright.config.js` to adjust browser settings or test behavior.
