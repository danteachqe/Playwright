# AGENT Instructions

This repository provides a Playwright-based automation framework for BlazeDemo.

## Structure
- **Configuration:**
  - `playwright.config.js`: Sets up test directories, browser projects (Chrome, Firefox, Edge, Android, iPhone), and reporting.
- **Page Objects (Pages/):**
  - `HomePage.js`: Actions and selectors for the BlazeDemo home page (city selection, navigation).
  - `FlightsPage.js`: Actions and selectors for the flights listing page (flight selection, verification).
  - `PurchasePage.js`: Actions and selectors for the purchase form (filling passenger/payment info, submitting purchase).
  - `ConfirmationPage.js`: Actions and selectors for the confirmation page (verifying purchase success and details).
- **Tests (tests/):**
  - All automated tests are in this directory (e.g., `demo.js`, `demo_ai.js`, `skip_clock.js`, etc.).
  - Tests use the Page Object Model and data-driven approach.
- **Test Data (data/):**
  - Contains all test data files (e.g., `flightData.json`, `passengerInfo.json`, `paymentInfo.json`, and their variants for different scenarios).
- **Reports (reports/):**
  - `reports/html/index.html`: HTML report for test runs (open in browser for detailed results).
  - `reports/test-results.json`: JSON report for test runs.
  - `test-results/junit.xml`: JUnit XML report for CI integration.
  - `test-results/`: Contains screenshots, videos, and traces for failed tests.

## Usage Notes
- Install dependencies with `npm install`.
- Run all tests with `npm test`.
- Run with all reporters (for CI) using `npm run test:ci`.
- View the HTML report by opening `reports/html/index.html` in your browser after a test run.
- View JSON results in `reports/test-results.json`.
- View JUnit results in `test-results/junit.xml`.
- For failed tests, review screenshots, videos, and traces in the `test-results/` directory.
- Adjust browser settings and test behavior in `playwright.config.js` as needed.

## Agent Execution Policy
- **Do not run any tests unless explicitly instructed by the user.**
- All executions must be headless for consistency and CI compatibility.
- Always follow the Page Object Model and data-driven approach for new tests.

---
For more details, see `playwright.config.js`, the `Pages/` directory, and the `README.md` file.
