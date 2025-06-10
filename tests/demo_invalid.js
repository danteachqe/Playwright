const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

const flightData = require('../data/flightData6.json');
const passengerInfo = require('../data/passengerInfo6.json');
const paymentInfo = require('../data/paymentInfo6.json');

test('Handle invalid flight data gracefully', async ({ page }) => {
  const { departureCity, destinationCity } = flightData;

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();

  await expect(async () => {
    await homePage.selectDepartureCity(departureCity);
  }).rejects.toThrow();

  await expect(async () => {
    await homePage.selectDestinationCity(destinationCity);
  }).rejects.toThrow();
});
