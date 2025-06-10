const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

// Dummy data inline to avoid loading files
const flightData = { departureCity: 'Denver', destinationCity: 'London' };
const passengerInfo = {
  name: 'Alice Tester',
  address: '123 Main St',
  city: 'Denver',
  state: 'CO',
  zipCode: '80014'
};
const paymentInfo = {
  creditCardNumber: '4111111111111111',
  creditCardMonth: '12',
  creditCardYear: '2030',
  nameOnCard: 'Alice Tester'
};

test('Dummy e2e reservation using POM', async ({ page }) => {
  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();
  await homePage.selectDepartureCity(flightData.departureCity);
  await homePage.selectDestinationCity(flightData.destinationCity);
  await homePage.findFlights();

  await flightsPage.verifyFlightsPage(flightData.departureCity, flightData.destinationCity);
  await flightsPage.verifyFlightsDisplayed();
  await flightsPage.selectFirstFlight();

  await purchasePage.verifyPurchasePageLoaded();
  await purchasePage.fillPassengerInfo(passengerInfo);
  await purchasePage.fillPaymentInfo(paymentInfo);
  await purchasePage.purchaseFlight();

  await confirmationPage.verifyConfirmationPage();
  await confirmationPage.verifyConfirmationDetails();
});
