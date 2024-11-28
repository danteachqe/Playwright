const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to BlazeDemo
  await page.goto('http://blazedemo.com');

  // Select departure and destination cities
  await page.selectOption('select[name="fromPort"]', 'Boston');
  await page.selectOption('select[name="toPort"]', 'New York');

  // Find flights
  await page.click('input[type="submit"]');

  // Wait for the results page to load
  await page.waitForSelector('table');

  // Choose the first flight
  await page.click('table tr:nth-child(2) input[type="submit"]');

  // Wait for the purchase page to load
  await page.waitForSelector('h2');

  // Fill in passenger details
  await page.fill('input[name="inputName"]', 'John Doe');
  await page.fill('input[name="address"]', '123 Main St');
  await page.fill('input[name="city"]', 'Anytown');
  await page.fill('input[name="state"]', 'Anystate');
  await page.fill('input[name="zipCode"]', '12345');
  await page.selectOption('select[name="cardType"]', 'visa');
  await page.fill('input[name="creditCardNumber"]', '4111111111111111');
  await page.fill('input[name="creditCardMonth"]', '12');
  await page.fill('input[name="creditCardYear"]', '2023');
  await page.fill('input[name="nameOnCard"]', 'John Doe');

  // Purchase the flight
  await page.click('input[type="submit"]');

  // Wait for the confirmation page to load
  await page.waitForSelector('h1');

  // Verify the confirmation message
  const confirmationMessage = await page.textContent('h1');
  if (confirmationMessage === 'Thank you for your purchase today!') {
    console.log('Test passed: Purchase confirmed.');
  } else {
    console.log('Test failed: Purchase not confirmed.');
  }

  // Close browser
  await browser.close();
})();
