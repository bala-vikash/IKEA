const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const convertToCSV = require('../utils/converttoCSV');
const getTimestamp = require('../utils/getTimestamp');

class StudyPage {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator("//input[@id='ikea-search-input']");
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
      chairProducts.push({ title, price });
    }
    const csvData = convertToCSV(chairProducts);
    const timestamp = getTimestamp();
    const filePath = path.join(__dirname, '..', 'output', `study-chairs_${timestamp}.csv`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, csvData, 'utf8');
  }

  async checkAssertions() {
    await expect(this.page).toHaveURL('https://www.ikea.com/in/en/');
  }
}
module.exports = { StudyPage };
