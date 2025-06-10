// tests/demo_invalid.js

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

const flightData = require('../data/flightData_invalid.json');
const passengerInfo = require('../data/passengerInfo_invalid.json');
const paymentInfo = require('../data/paymentInfo_invalid.json');

// This test uses invalid data and is expected to fail quickly.
test('Attempt booking with invalid data', async ({ page }) => {
  // Reduce default timeout so failures surface fast
  page.setDefaultTimeout(2000);

  const { departureCity, destinationCity } = flightData;

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();

  // These selections are expected to fail because the cities do not exist
  await homePage.selectDepartureCity(departureCity);
  await homePage.selectDestinationCity(destinationCity);

  // If somehow the cities were selected, continue with the flow
  await homePage.findFlights();
  await flightsPage.verifyFlightsPage(departureCity, destinationCity);
  await flightsPage.verifyFlightsDisplayed();
  await flightsPage.selectFirstFlight();

  await purchasePage.verifyPurchasePageLoaded();
  await purchasePage.fillPassengerInfo(passengerInfo);
  await purchasePage.fillPaymentInfo(paymentInfo);
  await purchasePage.purchaseFlight();

  await confirmationPage.verifyConfirmationPage();
  await confirmationPage.verifyConfirmationDetails();
});
