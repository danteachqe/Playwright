// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',            // Directory where tests are located
  testMatch: '**/*demo*.js',      // Matches test files
  timeout: 30000,                // Max time one test can run for (30 sec)
  
  // Retry failed tests n times (helps in flaky environments)
  retries: 2,                    // Adjust based on your needs

  // Run tests in parallel across multiple browsers
  workers: process.env.CI ? 1 : undefined, // Run in CI with 1 worker or on local with default
  
  // Configure which browsers to run tests in
  // projects: [
  //   {
  //     name: 'Chromium',
  //     use: { ...devices['Desktop Chrome'] },  // Default desktop Chromium
  //   },
  //   {
  //     name: 'Firefox',
  //     use: { ...devices['Desktop Firefox'] }, // Firefox
  //   },
  //   {
  //     name: 'WebKit',
  //     use: { ...devices['Desktop Safari'] },  // Safari WebKit
  //   },
  //   // Add mobile emulation if needed
  //   {
  //     name: 'Mobile Chrome',
  //     use: { ...devices['Pixel 5'] },        // Mobile Chrome (Pixel 5 emulation)
  //   },
  //   {
  //     name: 'Mobile Safari',
  //     use: { ...devices['iPhone 12'] },      // Mobile Safari (iPhone 12 emulation)
  //   },
  // ],
  
  // Test reporters (console, HTML, JSON, etc.)
  reporter: [
    ['list'],                               // Console reporter
    ['html', { outputFolder: 'reports/html' }], // HTML report stored in reports/html folder
    ['json', { outputFile: 'reports/test-results.json' }], // JSON report
    ['junit', { outputFile: 'reports/results.xml' }] // JUnit report for CI
  ],

  // Global configuration for tests
  use: {
    headless: false,                        // Run tests in headless mode (set to true in CI for faster execution)
    viewport: { width: 1280, height: 720 }, // Default viewport size
    ignoreHTTPSErrors: true,                // Ignore HTTPS errors
    video: 'retain-on-failure',             // Record video only on test failures
    screenshot: 'only-on-failure',          // Take screenshots only on failure
    trace: 'on-first-retry',                // Capture traces on first retry, useful for debugging
    baseURL: 'https://blazedemo.com',       // Set a base URL for your application
  },

  // Configure browser launch options
  browser: {
    chromiumSandbox: false,                 // Disable Chromium sandboxing (if needed)
    slowMo: 50,                             // Slow down by 50ms for debugging
  },

  // Test timeout settings per suite
  //globalSetup: require.resolve('./global-setup'), // Optional global setup before tests
  //globalTeardown: require.resolve('./global-teardown'), // Optional global teardown after tests
  forbidOnly: !!process.env.CI,             // Disallow test.only in CI
  preserveOutput: 'always',                 // Keep test output always for debugging
  fullyParallel: true,                      // Run tests in parallel
});
