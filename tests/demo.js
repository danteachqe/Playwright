const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { FlightsPage } = require('./pages/FlightsPage');
const { PurchasePage } = require('./pages/PurchasePage');
const { ConfirmationPage } = require('./pages/ConfirmationPage');

test('Search and Reserve a Flight on BlazeDemo', async ({ page }) => {
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
