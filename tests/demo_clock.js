const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

// Import test data
const flightData = require('../data/flightData1.json');
const passengerInfo = require('../data/passengerInfo1.json');
const paymentInfo = require('../data/paymentInfo1.json');

test('Search and Reserve a Flight on BlazeDemo with Clock Manipulation', async ({ page }) => {
  const { departureCity, destinationCity } = flightData;

  // Install the clock for time manipulation
  await page.clock.install();

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();
  await homePage.selectDepartureCity(departureCity);
  await homePage.selectDestinationCity(destinationCity);
  await homePage.findFlights();

  await flightsPage.verifyFlightsPage(departureCity, destinationCity);
  await flightsPage.verifyFlightsDisplayed();
  await flightsPage.selectFirstFlight();

  await purchasePage.verifyPurchasePageLoaded();
  await purchasePage.fillPassengerInfo(passengerInfo);
  await purchasePage.fillPaymentInfo(paymentInfo);

  // Log the current clock time
  const timeBeforeFastForward = await page.evaluate(() => Date.now());
  console.log(`Time before fast-forward: ${new Date(timeBeforeFastForward).toISOString()}`);

  // Fast-forward time by 3 minutes (in milliseconds)
  console.log('Fast-forwarding time by 3 minutes...');
  await page.clock.fastForward(3 * 60 * 1000); 

  // Log the clock time after fast-forwarding
  const timeAfterFastForward = await page.evaluate(() => Date.now());
  console.log(`Time after fast-forward: ${new Date(timeAfterFastForward).toISOString()}`);

  // Calculate the fast-forwarded difference
  const fastForwardedTime = timeAfterFastForward - timeBeforeFastForward;
  console.log(`Fast-forwarded time difference: ${fastForwardedTime / 1000} seconds`);

  await purchasePage.purchaseFlight();

  await confirmationPage.verifyConfirmationPage();
  await confirmationPage.verifyConfirmationDetails();

  // Resume normal clock behavior (optional)
  await page.clock.resume();
});
