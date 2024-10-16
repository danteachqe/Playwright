const { test, expect } = require('@playwright/test');

test('Book a flight from Boston to New York', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('http://blazedemo.com/');

  // Step 2: Locate the "Departure City" dropdown menu and select "Boston"
  await page.selectOption('select[name="fromPort"]', 'Boston');

  // Step 3: Locate the "Destination City" dropdown menu and select "New York"
  await page.selectOption('select[name="toPort"]', 'New York');

  // Step 4: Click on the "Find Flights" button
  await page.click('input[type="submit"]');

  // Step 5: Verify that the user is redirected to the flights listing page
  await expect(page).toHaveURL(/reserve/);

  // Step 6: Verify the list of available flights is displayed
  const flightList = page.locator('table tbody tr');

  // Option 1: Using manual count verification
  const flightCount = await flightList.count();
  expect(flightCount).toBeGreaterThan(0);

  // Option 2: Using a range with toHaveCount (if supported)
  // await expect(flightList).toHaveCount({ greaterThan: 0 });

  // Proceeding with the first flight selection
  await flightList.nth(0).locator('input[type="submit"]').click();

  // Step 8: Verify that the user is on the purchase page
  await expect(page).toHaveURL(/purchase/);

  // Step 9: Fill in the purchase form with dummy passenger details
  await page.fill('input[name="inputName"]', 'John Doe');
  await page.fill('input[name="address"]', '123 Elm Street');
  await page.fill('input[name="city"]', 'Boston');
  await page.fill('input[name="state"]', 'MA');
  await page.fill('input[name="zipCode"]', '02115');
  await page.fill('input[name="creditCardNumber"]', '4111111111111111');
  await page.fill('input[name="nameOnCard"]', 'John Doe');

  // Step 10: Click on the "Purchase Flight" button
  await page.click('input[type="submit"]');

  // Step 11: Verify that the user is on the confirmation page
  await expect(page).toHaveURL(/confirmation/);

  // Step 12: Verify the confirmation details are displayed
  await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!');

  const confirmationId = await page.locator('tr:nth-child(1) td:nth-child(2)').textContent();
  expect(confirmationId).not.toBeNull();

  console.log('Purchase confirmation ID:', confirmationId);
});
