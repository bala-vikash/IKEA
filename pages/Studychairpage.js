const { writeCsv } = require('../utils/writeCsv');
 
class StudyPage {
  constructor(page) {
    this.page = page;
    this.filters = page.getByRole("button", { name: "All filters" });
    this.customerRating = page.locator("//span[@id='SEC_RATINGS_title']");
    this.fourRating = page.locator('//div[@id="SEC_RATINGS"]/div/div/fieldset/label[1]/span[1]');
    this.viewButton = page.locator("//button[@aria-label='View 41']");
    this.priceCards = page.locator("[data-testid='plp-product-card']").locator(".plp-mastercard__price");
  }
 
  async allFilter() {
    await this.filters.click();
  }
 
  async rating() {
    await this.customerRating.click();
  }
 
  async checkRating() {
    await this.fourRating.click();
  }
 
  async viewAll() {
    await this.viewButton.click();
  }
 
  async chairCards() {
    const chairProducts = [];
    for (let i = 0; i < 3; i++) {
      const title = await this.priceCards.nth(i).locator(".plp-price-module__product-name").textContent();
      const price = await this.priceCards.nth(i).locator(".plp-price__sr-text").textContent();
      if (title && price) {
        chairProducts.push({ title: title.trim(), price: price.trim() });
      }
    }
 
    writeCsv(chairProducts, 'studychair.csv');
  }
 
  async checkAssertions() {
    await expect(this.page).toHaveURL('https://www.ikea.com/in/en/');
  }
}
 
module.exports = { StudyPage };
 
 