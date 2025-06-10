const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

const flightData = require('../data/flightData_invalid.json');
const passengerInfo = require('../data/passengerInfo_invalid.json');
const paymentInfo = require('../data/paymentInfo_invalid.json');

// Fail fast so invalid selections don't hang
const SHORT_TIMEOUT = 2000;

test('Attempt booking with invalid data', async ({ page }) => {
  // Reduce default timeout to avoid long waits on failing actions
  test.setTimeout(15000);
  page.setDefaultTimeout(SHORT_TIMEOUT);

  const { departureCity, destinationCity } = flightData;

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();

  // Selecting invalid cities should fail quickly
  await expect(homePage.selectDepartureCity(departureCity)).rejects.toThrow();
  await expect(homePage.selectDestinationCity(destinationCity)).rejects.toThrow();

  // The test intentionally stops here as invalid input prevents further steps
});
