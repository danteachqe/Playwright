const { test, expect } = require('@playwright/test');

class FlightsPage {
    constructor(page) {
      this.page = page;
      this.flightTable = this.page.locator('table.table');
      this.flights = this.flightTable.locator('tbody tr');
    }
  
    async verifyFlightsPage(departureCity, destinationCity) {
      console.log('Verifying flights listing page loaded...');
      await expect(this.page).toHaveURL('https://blazedemo.com/reserve.php');
      await expect(this.page.locator('h3')).toHaveText(`Flights from ${departureCity} to ${destinationCity}:`);
    //  await this.page.screenshot({ path: 'step6_flights_listing_page.png' });
    }
  
    async verifyFlightsDisplayed() {
      console.log('Verifying flight entries are displayed...');
      const flightCount = await this.flights.count();
      console.log(`Number of flights found: ${flightCount}`);
      expect(flightCount).toBeGreaterThan(0); // Ensure at least one flight is listed
    //  await this.page.screenshot({ path: 'step7_flights_displayed.png' });
    }
  
    async selectFirstFlight() {
      console.log('Selecting the first available flight...');
      await this.flights.first().locator('input[type="submit"]').click();
    await this.page.screenshot({ path: 'step8_first_flight_selected.png' });
    }
  }
  
  module.exports = { FlightsPage };
  