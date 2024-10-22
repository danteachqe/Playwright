const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',             // Directory where tests are located
  testMatch: '**/*demo*.js',      // Matches test files
  timeout: 300000,                 // Max time one test can run for (30 sec)
  
  // Retry failed tests n times (helps in flaky environments)
  retries: 1,                     // Adjust based on your needs

  // Run tests sequentially
  workers: 2,                     // Run tests one after the other

  // Ensure tests within a project run sequentiall
  fullyParallel: false,           
  
  // Configure which browsers to run tests in
  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],       // Use Chrome browser
        headless: true,                     // Run in headless mode
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        baseURL: 'https://blazedemo.com',
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],      // Use Firefox browser
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        baseURL: 'https://blazedemo.com',
      },
    },
    {
      name: 'Edge',
      use: {
        channel: 'msedge',                  // Use Microsoft Edge browser
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        baseURL: 'https://blazedemo.com',
      },
    },
  ],
  
  // Test reporters (console, HTML, JSON, etc.)
  reporter: [
    ['list'],                                  // Console reporter
    ['html', { outputFolder: 'reports/html' }],// HTML report
    ['json', { outputFile: 'reports/test-results.json' }], // JSON report
    ['junit', { outputFile: 'reports/results.xml' }],      // JUnit report
  ],

  // Global test configuration (if not specified in 'use' of projects)
  // Removed duplicate 'use' options since they are specified per project

  // Disallow 'test.only' in CI environments
  forbidOnly: !!process.env.CI,              

  // Keep test artifacts (screenshots, traces) always
  preserveOutput: 'always',                 
});
