const { expect } = require("@playwright/test");
// const { takeTimestampedScreenshot } = require("../utils/screenshotUtil");
 
class PaymentPage {
  constructor(page) {
    this.page = page;
    this.debitCard = page.locator("#L02");
    this.selectCardType = page.locator("#selectDebitCard");
    this.cardNumber = page.locator("#cardNumber");
    this.cardHolderName = page.locator("#cardHolderName");
    this.expiryMonth = page.locator("#month");
    this.expiryYear = page.locator("#year");
    this.cvv = page.locator("#CVVNumber");
    this.payNowButton = page.locator("#credit_submit");
    this.validateCardNumberMessage = page.locator("//span[text()='Invalid Card Number']");
  }
 
  async fillCardDetails(cardNum, cardName, cvv) {
    await this.debitCard.click();
    await this.selectCardType.click();
    await this.selectCardType.selectOption("RUPAY");
    await this.cardNumber.fill(cardNum);
    await this.cardHolderName.fill(cardName);
    await this.expiryMonth.selectOption("06");
    await this.expiryYear.selectOption("2027");
    await this.cvv.fill(cvv);
  }
 
  async submitPayment() {
    await this.payNowButton.click();
  }
 
  // async validateCardNumberError() {
  //   try {
  //     await expect(this.validateCardNumberMessage).toHaveText("Invalid Card Number");
  //     await takeTimestampedScreenshot(this.page, "InvalidCard");
  //   } catch (error) {
  //     throw new Error(`Validation failed and screenshot was not captured: ${error}`);
  //   }
  // }
 
  async validateCardNumberError()
  {
    await expect(this.validateCardNumberMessage).toHaveText("Invalid Card Number");
    await this.page.screenshot({path:"./screenshots/paymentpage.png"});
  }
}
module.exports = { PaymentPage };
 
 