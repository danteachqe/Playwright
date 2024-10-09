// tests/spec.js
const { test, expect } = require('@playwright/test');

test('Basic test', async ({ page }) => {
  // Navigate to blazedemo.com
  await page.goto('https://blazedemo.com');

  // Check that the title contains "BlazeDemo"
  await expect(page).toHaveTitle(/BlazeDemo/);

  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png' });
});
