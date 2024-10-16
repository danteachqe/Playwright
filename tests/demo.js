// flightBooking.spec.js

const { test, expect } = require('@playwright/test');

test('Search and Reserve a Flight on BlazeDemo', async ({ page }) => {
  
  // **Test Data**
  const departureCity = 'Boston';
  const destinationCity = 'New York';
  
  const passengerInfo = {
    name: 'John Doe',
    address: '123 Elm Street',
    city: 'Boston',
    state: 'MA',
    zipCode: '02118',
  };
  
  const paymentInfo = {
    creditCardNumber: '4111111111111111',
    creditCardMonth: '12',
    creditCardYear: '2025',
    nameOnCard: 'John Doe',
  };

  // **Step 1: Navigate to Homepage**
  console.log('Navigating to homepage...');
  await page.goto('https://blazedemo.com/'); // Use HTTPS for consistency
  await page.screenshot({ path: 'step1_homepage.png' });
  
  // **Verify Homepage Loaded**
  console.log('Verifying homepage loaded...');
  await expect(page).toHaveURL('https://blazedemo.com/');
  await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');
  await page.screenshot({ path: 'step2_homepage_loaded.png' });
  
  // **Step 2: Select Departure City**
  console.log(`Selecting departure city: ${departureCity}`);
  await page.selectOption('select[name="fromPort"]', { label: departureCity });
  await page.screenshot({ path: 'step3_departure_city_selected.png' });
  
  // **Step 3: Select Destination City**
  console.log(`Selecting destination city: ${destinationCity}`);
  await page.selectOption('select[name="toPort"]', { label: destinationCity });
  await page.screenshot({ path: 'step4_destination_city_selected.png' });
  
  // **Step 4: Click "Find Flights" Button**
  console.log('Clicking "Find Flights" button...');
  await page.click('input[type="submit"]');
  await page.screenshot({ path: 'step5_find_flights_clicked.png' });
  
  // **Step 5: Verify Flights Listing Page**
  console.log('Verifying flights listing page loaded...');
  await expect(page).toHaveURL('https://blazedemo.com/reserve.php');
  await expect(page.locator('h3')).toHaveText(`Flights from ${departureCity} to ${destinationCity}:`);
  await page.screenshot({ path: 'step6_flights_listing_page.png' });
  
  // **Verify Flight Entries are Displayed**
  console.log('Verifying flight entries are displayed...');
  const flightTable = page.locator('table.table');
  await expect(flightTable).toBeVisible();
  
  const flights = flightTable.locator('tbody tr');
  const flightCount = await flights.count();
  console.log(`Number of flights found: ${flightCount}`);
  expect(flightCount).toBeGreaterThan(0); // Ensure at least one flight is listed
  await page.screenshot({ path: 'step7_flights_displayed.png' });
  
  // **Step 6: Select the First Available Flight**
  console.log('Selecting the first available flight...');
  await flights.first().locator('input[type="submit"]').click();
  await page.screenshot({ path: 'step8_first_flight_selected.png' });
  
  // **Step 7: Verify Reservation Page**
  console.log('Verifying reservation page loaded...');
  await expect(page).toHaveURL('https://blazedemo.com/purchase.php');
  await page.screenshot({ path: 'step9_reservation_page.png' });
  
  // **Update Expected Text Based on Test Data**
  console.log('Verifying reservation text...');
  const expectedReservationText = `Your flight from TLV to SFO has been reserved.`;
  await expect(page.locator('h2')).toHaveText(expectedReservationText, { timeout: 10000 }); // Increased timeout
  await page.screenshot({ path: 'step10_reservation_text_verified.png' });
  
  // **Step 8: Fill in Passenger Information**
  console.log('Filling in passenger information...');
  await page.fill('input[name="inputName"]', passengerInfo.name);
  await page.fill('input[name="address"]', passengerInfo.address);
  await page.fill('input[name="city"]', passengerInfo.city);
  await page.fill('input[name="state"]', passengerInfo.state);
  await page.fill('input[name="zipCode"]', passengerInfo.zipCode);
  await page.screenshot({ path: 'step11_passenger_info_filled.png' });
  
  // **Step 9: Fill in Payment Information**
  console.log('Filling in payment information...');
  await page.fill('input[name="creditCardNumber"]', paymentInfo.creditCardNumber);
  await page.fill('input[name="creditCardMonth"]', paymentInfo.creditCardMonth);
  await page.fill('input[name="creditCardYear"]', paymentInfo.creditCardYear);
  await page.fill('input[name="nameOnCard"]', paymentInfo.nameOnCard);
  await page.screenshot({ path: 'step12_payment_info_filled.png' });
  
  // **Step 10: Click "Purchase Flight" Button**
  console.log('Clicking "Purchase Flight" button...');
  await page.click('input[type="submit"]');
  await page.screenshot({ path: 'step13_purchase_flight_clicked.png' });
  
  // **Step 11: Verify Confirmation Page**
  console.log('Verifying confirmation page loaded...');
  // Adjust the URL pattern based on the actual confirmation page URL
  await expect(page).toHaveURL(/.*confirmation/, { timeout: 10000 });
  await page.screenshot({ path: 'step14_confirmation_page.png' });
  
  // **Verify Confirmation Details**
  console.log('Verifying confirmation details...');
  const confirmationTable = page.locator('table.table tbody');
  
  // Ensure the confirmation table is present
  await expect(confirmationTable).toBeVisible();
  await page.screenshot({ path: 'step15_confirmation_table.png' });
  
  // **Confirmation ID**
  console.log('Verifying confirmation ID is visible...');
  const confirmationId = confirmationTable.locator('tr').first().locator('td:nth-child(2)');
  await expect(confirmationId).toBeVisible();
  await page.screenshot({ path: 'step16_confirmation_id.png' });
  
  
  // **Payment Details**
  console.log('Verifying payment details...');
  const paymentDetails = confirmationTable.locator('tr').nth(3);
  await expect(paymentDetails.locator('td:nth-child(2)')).toContainText('xxxxxxxxxxxx1111'); // Masked credit card
  await page.screenshot({ path: 'step17_payment_details.png' });
  
 
  // **Ensure No Error Messages are Displayed**
  console.log('Verifying no error messages are displayed...');
  const errorMessages = page.locator('.alert.alert-danger');
  await expect(errorMessages).toHaveCount(0);
  await page.screenshot({ path: 'step18_no_errors.png' });
  
  // **Optional: Verify URL Reflects Confirmation State**
  // Adjust the regex as needed based on the actual confirmation page URL structure
  // await expect(page).toHaveURL(/.*confirmation\.html/);
  
});