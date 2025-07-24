class GiftcardPage {
  constructor(page) {
    this.page = page;
    this.buyGiftcard = page.locator("//span[text()='Buy IKEA Gift Card online']");
    this.amount1000 = page.getByText("Rs 1,000");
    this.amount5000 = page.getByText("Rs 5,000");
    this.amount10000 = page.getByText("Rs 10,000");
    this.forSomeone = page.locator('//*[@id="content"]/div[2]/div/div/form/div[2]/div/div/div/div[2]/div/div[1]/div[1]/label');
    this.forMyself = page.getByText("For myself");
    this.firstName = page.locator("#desfirstname");
    this.lastName = page.locator("#deslastname");
    this.email = page.locator("#desemail");
    this.confirmEmail = page.locator("#desconfEmail");
    this.addToCart = page.locator("#submit");
    this.continue = page.locator("//a[text()='Continue']");
    this.yourFirstname = page.locator("#firstname");
    this.yourLastname = page.locator("#lastname");
    this.yourEmail = page.locator("#email");
    this.yourConfirmEmail = page.locator("#confEmail");
    this.terms = page.locator('//*[@id="formCreateOrder"]/div/div/div/div/div[1]/div[5]/div/div/div/label');
    this.continueButton = page.locator("#submitOrder");
  }

  async goto() {
    await this.page.goto("https://www.ikea.com/in/en/customer-service/ikea-gift-cards-pub004138e1/");
    await this.page.waitForLoadState("networkidle");
  }

  async giftCardClick() {
    await this.buyGiftcard.click();
  }

  async selectGiftCardAmount(amount) {
    if (amount === 1000) await this.amount1000.click();
    else if (amount === 5000) await this.amount5000.click();
    else if (amount === 10000) await this.amount10000.click();
  }

  async fillDetails(name, lname, email, cEmail, type) {
    if (type === "myself") {
      await this.forMyself.click();
      await this.firstName.fill(name);
      await this.lastName.fill(lname);
    } else {
      await this.firstName.fill(name);
      await this.lastName.fill(lname);
      await this.email.fill(email);
      await this.confirmEmail.fill(cEmail);
    }
    await this.addToCart.click();
    await this.continue.click();
  }

  async yourDetails(yFname, yLname, yEmail, yCemail) {
    await this.yourFirstname.fill(yFname);
    await this.yourLastname.fill(yLname);
    await this.yourEmail.fill(yEmail);
    await this.yourConfirmEmail.fill(yCemail);
    await this.terms.click();
    await this.continueButton.click();
  }
}
module.exports = { GiftcardPage };
