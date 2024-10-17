// tests/flightReservation.spec.js

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { FlightsPage } = require('../pages/FlightsPage');
const { PurchasePage } = require('../pages/PurchasePage');
const { ConfirmationPage } = require('../pages/ConfirmationPage');

// Import test data
const flightData = require('../data/flightData1.json');
const passengerInfo = require('../data/passengerInfo1.json');
const paymentInfo = require('../data/paymentInfo1.json');

test('Search and Reserve a Flight on BlazeDemo', async ({ page }) => {
  const { departureCity, destinationCity } = flightData;

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
  await purchasePage.purchaseFlight();

  await confirmationPage.verifyConfirmationPage();
  await confirmationPage.verifyConfirmationDetails();
});
