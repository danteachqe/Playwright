
const { expect } = require('@playwright/test');  // Import expect from Playwright

class ConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async verifyConfirmationPage() {
    console.log('Verifying confirmation page loaded...');
    await expect(this.page).toHaveURL(/.*confirmation/, { timeout: 10000 });
  //  await this.page.screenshot({ path: 'step14_confirmation_page.png' });
  }

  async verifyConfirmationDetails() {
    console.log('Verifying confirmation details...');
    const confirmationTable = this.page.locator('table.table tbody');
    await expect(confirmationTable).toBeVisible();
  //  await this.page.screenshot({ path: 'step15_confirmation_table.png' });

    console.log('Verifying confirmation ID is visible...');
    const confirmationId = confirmationTable.locator('tr').first().locator('td:nth-child(2)');
    await expect(confirmationId).toBeVisible();
  //  await this.page.screenshot({ path: 'step16_confirmation_id.png' });

    console.log('Verifying payment details...');
    const paymentDetails = confirmationTable.locator('tr').nth(3);
    await expect(paymentDetails.locator('td:nth-child(2)')).toContainText('xxxxxxxxxxxx1111'); // Masked credit card
   await this.page.screenshot({ path: 'step17_payment_details.png' });
  }
}

module.exports = { ConfirmationPage };
