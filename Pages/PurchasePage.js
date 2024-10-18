const { test, expect } = require('@playwright/test');

class PurchasePage {
  constructor(page) {
    this.page = page;
  }

  async verifyPurchasePageLoaded() {
    console.log('Verifying reservation page loaded...');
    await expect(this.page).toHaveURL('https://blazedemo.com/purchase.php');
  //  await this.page.screenshot({ path: 'step9_reservation_page.png' });
  }

  async fillPassengerInfo(passengerInfo) {
    console.log('Filling in passenger information...');
    await this.page.fill('input[name="inputName"]', passengerInfo.name);
    await this.page.fill('input[name="address"]', passengerInfo.address);
    await this.page.fill('input[name="city"]', passengerInfo.city);
    await this.page.fill('input[name="state"]', passengerInfo.state);
    await this.page.fill('input[name="zipCode"]', passengerInfo.zipCode);
  await this.page.screenshot({ path: 'step11_passenger_info_filled.png' });
  }

  async fillPaymentInfo(paymentInfo) {
    console.log('Filling in payment information...');
    await this.page.fill('input[name="creditCardNumber"]', paymentInfo.creditCardNumber);
    await this.page.fill('input[name="creditCardMonth"]', paymentInfo.creditCardMonth);
    await this.page.fill('input[name="creditCardYear"]', paymentInfo.creditCardYear);
    await this.page.fill('input[name="nameOnCard"]', paymentInfo.nameOnCard);
  //  await this.page.screenshot({ path: 'step12_payment_info_filled.png' });
  }

  async purchaseFlight() {
    console.log('Clicking "Purchase Flight" button...');
    await this.page.click('input[type="submit"]');
  //  await this.page.screenshot({ path: 'step13_purchase_flight_clicked.png' });
  }
}

module.exports = { PurchasePage };
