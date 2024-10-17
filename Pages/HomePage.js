const {  expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
      this.page = page;
      this.departureDropdown = 'select[name="fromPort"]';
      this.destinationDropdown = 'select[name="toPort"]';
      this.findFlightsButton = 'input[type="submit"]';
    }
  
    async goto() {
      await this.page.goto('https://blazedemo.com/');
    }
  
    async verifyHomePageLoaded() {
      await expect(this.page).toHaveURL('https://blazedemo.com/');
      await expect(this.page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');
    }
  
    async selectDepartureCity(city) {
      await this.page.selectOption(this.departureDropdown, { label: city });
    }
  
    async selectDestinationCity(city) {
      await this.page.selectOption(this.destinationDropdown, { label: city });
    }
  
    async findFlights() {
      await this.page.click(this.findFlightsButton);
    }
  }
  
  module.exports = { HomePage };  // Correct export
  