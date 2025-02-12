// tests/flightReservation.spec.js

const { test, expect } = require('@playwright/test');
const { ai } = require('@zerostep/playwright');
const { HomePage } = require('../Pages/HomePage');
const { FlightsPage } = require('../Pages/FlightsPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { ConfirmationPage } = require('../Pages/ConfirmationPage');

// Import test data
const flightData = require('../data/flightData.json');
const passengerInfo = require('../data/passengerInfo.json');
const paymentInfo = require('../data/paymentInfo.json');

test.describe('BlazeDemo Flight Booking', () => {
  test('Search and Reserve a Flight on BlazeDemo', async ({ page }) => {
    const { departureCity, destinationCity } = flightData;

    const homePage = new HomePage(page);
    const flightsPage = new FlightsPage(page);
    const purchasePage = new PurchasePage(page);
    const confirmationPage = new ConfirmationPage(page);

    // STEP 1: Go to BlazeDemo homepage
    await homePage.goto();
    await homePage.verifyHomePageLoaded();

    // STEP 2 (AI): Select departure city
    await ai(`Select "${departureCity}" from the departure city dropdown`, { page, test });
    await page.waitForTimeout(5000);

    // STEP 3 (AI): Select destination city
    await ai(`Select "${destinationCity}" from the destination city dropdown`, { page, test });
    await page.waitForTimeout(5000);

    // STEP 4 (AI): Click the "Find Flights" button
    await ai('Click the Find Flights button', { page, test });
    await page.waitForTimeout(5000);

    // --- Return to Standard POM Methods ---

    // Verify flights page & select flight
    await flightsPage.verifyFlightsPage(departureCity, destinationCity);
    await flightsPage.verifyFlightsDisplayed();
    await flightsPage.selectFirstFlight();

    // Verify purchase page & fill details
    await purchasePage.verifyPurchasePageLoaded();
    await purchasePage.fillPassengerInfo(passengerInfo);
    await purchasePage.fillPaymentInfo(paymentInfo);
    await purchasePage.purchaseFlight();

    // Verify confirmation
    await confirmationPage.verifyConfirmationPage();
    await confirmationPage.verifyConfirmationDetails();
  });
});
