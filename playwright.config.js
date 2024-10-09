// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Specify your test directory
  testMatch: '**/*spec.js', // Specify your test file pattern
  timeout: 30000, // Optional: Set default test timeout
  retries: 0, // Optional: Number of retries on failure
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Record video on test failure
    screenshot: 'only-on-failure', // Take screenshot on test failure
  },
});
