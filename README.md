# Playwright BlazeDemo Automation Framework

## Overview
This project is a Playwright-based automation framework for testing the BlazeDemo website using best practices:
- Page Object Model (POM) for maintainable test code
- Test data separated in the `data/` directory
- All tests in the `tests/` directory
- Headless browser execution by default
- Multi-browser support (Chrome, Firefox, Edge, Android, iPhone)
- Rich reporting (HTML, JSON, JUnit)

## Project Structure
```
Playwright/
  Pages/           # Page Object classes
  data/            # Test data files (JSON)
  tests/           # Automated test scripts
  reports/         # Test reports (HTML, JSON, JUnit)
  playwright.config.js  # Playwright configuration
  package.json     # Project dependencies and scripts
  .gitignore       # Files/folders to ignore in git
```

## Usage
1. Install dependencies:
   ```
npm install
   ```
2. Run all tests:
   ```
npm test
   ```
3. Run with all reporters (for CI):
   ```
npm run test:ci
   ```
4. View HTML report:
   ```
start reports/html/index.html
   ```

## Best Practices
- Use only headless mode for all test runs.
- Keep test data and test logic separate.
- Use Page Objects for all page interactions.
- Keep Playwright and dependencies up to date.
- Use clear, consistent naming for all files.

---
For more details, see `playwright.config.js` and the `Pages/` directory.

Unless specified in the prompt do not try to run any of the tests, or code, when you do any code changes