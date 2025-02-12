import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test.describe('BlazeDemo Flight Booking', () => {
  test('book a flight from Boston to New York', async ({ page }) => {
    await page.goto('http://blazedemo.com');
    await page.waitForTimeout(5000); // Explicit wait

    // Step 1: Select departure city as Boston
    await ai('Select "Boston" from the departure city dropdown', { page, test });
    await page.waitForTimeout(5000);

    // Step 2: Select destination city as New York
    await ai('Select "New York" from the destination city dropdown', { page, test });
    await page.waitForTimeout(5000);

    // Step 3: Click the button to find flights
    await ai('Click the Find Flights button', { page, test });
    await page.waitForTimeout(5000);

    // Step 4: Wait for the flight results and choose the first flight
    await ai('Select the first flight from the results table', { page, test });
    await page.waitForTimeout(5000);

    // Step 5: Fill in passenger details
    await ai('Enter passenger details with realistic values, for state just say NY', { page, test });
    await page.waitForTimeout(5000);

    // Step 6: Confirm the purchase
    await ai('Click the Purchase button', { page, test });
    await page.waitForTimeout(5000);

    // Step 7: Verify the confirmation message
    const confirmationMessage = await page.getByText('Thank you for your purchase today!');
    expect(confirmationMessage).toBeDefined();
  });
});
