// HomePage.js
const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;

        // Define selectors with both XPath and CSS
        this.selectors = {
            departureDropdown: {
                xpath: '//select[@name="fromPort"]',
                css: 'select[name="fromPort"]'
            },
            destinationDropdown: {
                xpath: '//select[@name="toPort"]',
                css: 'select[name="toPort"]'
            },
            findFlightsButton: {
                xpath: '//input[@type="submit" and @value="Find Flights"]',
                css: 'input[type="submit"][value="Find Flights"]'
            },
            pageHeader: {
                xpath: '//h1',
                css: 'h1'
            },
            // Add more elements as needed
        };
    }

    /**
     * Helper method to get a locator with fallback
     * @param {Object} selectors - Object containing primary and fallback selectors
     * @returns {Locator} - Playwright Locator object
     */
    async getLocator(selectors) {
        // Attempt using XPath first
        let locator = this.page.locator(`xpath=${selectors.xpath}`);
        if (await locator.count() > 0) {
            return locator;
        }

        // If not found, attempt using CSS selector
        locator = this.page.locator(selectors.css);
        if (await locator.count() > 0) {
            return locator;
        }

        // If still not found, throw an error
        throw new Error(`Element not found using XPath: ${selectors.xpath} or CSS: ${selectors.css}`);
    }

    /**
     * Navigates to the Home Page using relative URL
     */
    async goto() {
        await this.page.goto('/'); // Relative URL; Playwright prepends baseURL
    }

    /**
     * Verifies that the Home Page has loaded correctly
     */
    async verifyHomePageLoaded() {
        await expect(this.page).toHaveURL(this.page.url().includes(this.page.url()) ? this.page.url() : this.page.url()); // Optional: Adjust as necessary
        const headerLocator = await this.getLocator(this.selectors.pageHeader);
        await expect(headerLocator).toHaveText('Welcome to the Simple Travel Agency!');
    }

    /**
     * Selects the departure city from the dropdown
     * @param {string} city - The departure city to select
     */
    async selectDepartureCity(city) {
        const departureLocator = await this.getLocator(this.selectors.departureDropdown);
        // Fail fast if city is not in dropdown
        const options = await departureLocator.locator('option').allTextContents();
        if (!options.includes(city)) {
            throw new Error(`Departure city '${city}' not found in dropdown options: ${options.join(', ')}`);
        }
        await departureLocator.selectOption({ label: city });
    }

    /**
     * Selects the destination city from the dropdown
     * @param {string} city - The destination city to select
     */
    async selectDestinationCity(city) {
        const destinationLocator = await this.getLocator(this.selectors.destinationDropdown);
        // Fail fast if city is not in dropdown
        const options = await destinationLocator.locator('option').allTextContents();
        if (!options.includes(city)) {
            throw new Error(`Destination city '${city}' not found in dropdown options: ${options.join(', ')}`);
        }
        await destinationLocator.selectOption({ label: city });
    }

    /**
     * Clicks the 'Find Flights' button
     */
    async findFlights() {
        const findFlightsLocator = await this.getLocator(this.selectors.findFlightsButton);
        await findFlightsLocator.click();
    }

    // Additional methods can be added here following the same pattern
}

module.exports = { HomePage };
