// tests/blazedemo.spec.ts

import { test, expect } from '@playwright/test';

test.describe('BlazeDemo E2E Flight Search', () => {
  test('should search for flights from Boston to New York and display results', async ({ page }) => {
    // **Preconditions: Navigate to the BlazeDemo homepage**
    await page.goto('http://blazedemo.com/');

    // **Test Step 1: Locate the "Departure City" dropdown and select "Boston"**
    await page.selectOption('select[name="fromPort"]', { label: 'Boston' });
    // Alternatively, you can use the value if known, e.g.,
    // await page.selectOption('select[name="fromPort"]', 'Boston');

    // **Test Step 2: Locate the "Destination City" dropdown and select "New York"**
    await page.selectOption('select[name="toPort"]', { label: 'New York' });
    // Alternatively, use the value:
    // await page.selectOption('select[name="toPort"]', 'New York');

    // **Test Step 3: Click on the "Find Flights" button**
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }), // Wait for navigation to complete
      page.click('input[type="submit"]'), // Click the submit button
    ]);

    // **Expected Result Step 5: Verify redirection to the flights listing page**
    await expect(page).toHaveURL(/reserve\.php/);

    // **Expected Result Step 6: Verify that a list of available flights is displayed**
    // Assuming that flights are listed in a table with class 'table'
    const flightsTable = page.locator('table.table');
    await expect(flightsTable).toBeVisible();

    // Verify that there is at least one flight listed
    const flightRows = flightsTable.locator('tbody tr');
    const flightCount = await flightRows.count();
    expect(flightCount).toBeGreaterThan(0);

    // **Verify each flight entry includes the required details**
    // Assuming the table columns are:
    // 1. Choose Flight (button)
    // 2. Airline Name
    // 3. Flight Number
    // 4. Departure Time
    // 5. Arrival Time
    // 6. Price

    for (let i = 0; i < flightCount; i++) {
      const row = flightRows.nth(i);
      
      // Verify Airline Name is visible
      await expect(row.locator('td:nth-child(2)')).toBeVisible();
      await expect(row.locator('td:nth-child(2)')).not.toBeEmpty();

      // Verify Flight Number is visible
      await expect(row.locator('td:nth-child(3)')).toBeVisible();
      await expect(row.locator('td:nth-child(3)')).not.toBeEmpty();

      // Verify Departure Time is visible
      await expect(row.locator('td:nth-child(4)')).toBeVisible();
      await expect(row.locator('td:nth-child(4)')).not.toBeEmpty();

      // Verify Arrival Time is visible
      await expect(row.locator('td:nth-child(5)')).toBeVisible();
      await expect(row.locator('td:nth-child(5)')).not.toBeEmpty();

      // Verify Price is visible and formatted correctly
      const price = row.locator('td:nth-child(6)');
      await expect(price).toBeVisible();
      await expect(price).toHaveText(/\$\d+\.\d{2}/);
    }

    // **Verify no error messages are displayed**
    const errorMessages = page.locator('.alert, .error, .validation-error');
    await expect(errorMessages).toHaveCount(0);

    // **Optional: Verify the URL reflects the search parameters**
    // This depends on how BlazeDemo structures its URLs
    // For example, if parameters are passed as query strings:
    // await expect(page).toHaveURL(/fromPort=Boston&toPort=New%20York/);
  });
});
