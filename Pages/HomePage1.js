const { expect } = require('@playwright/test');

class HomePage1 {
    constructor(page) {
        this.page = page;
        this.departureDropdown = 'xpath=//select[@name="fromPort"]';
        this.destinationDropdown = 'xpath=//select[@name="toPort"]';
        this.findFlightsButton = 'xpath=//input[@type="submit" and @value="Find Flights"]';
        this.pageHeader = 'xpath=//h1';
    }

    async goto() {
        await this.page.goto('https://blazedemo.com/');
    }

    async verifyHomePageLoaded() {
        await expect(this.page).toHaveURL('https://blazedemo.com/');
        await expect(this.page.locator(this.pageHeader)).toHaveText('Welcome to the Simple Travel Agency!');
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

module.exports = { HomePage1 };
