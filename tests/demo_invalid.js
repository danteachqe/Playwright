const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

// Use deliberately invalid test data
const flightData = require('../data/flightData6.json');
const passengerInfo = require('../data/passengerInfo6.json');
const paymentInfo = require('../data/paymentInfo6.json');

test('Invalid city selection should fail fast', async ({ page }) => {
  // Keep the test short so failures surface quickly
  test.setTimeout(5000);
  page.setDefaultTimeout(1000);

  const { departureCity, destinationCity } = flightData;

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();

  await expect(homePage.selectDepartureCity(departureCity)).rejects.toThrow();
  await expect(homePage.selectDestinationCity(destinationCity)).rejects.toThrow();
});
