const fs = require("fs");
const path = require("path");
const convertToCSV = require("../utils/converttoCSV");
const getTimestamp = require("../utils/getTimestamp");

class BookshelvesPage {
  constructor(page) {
    this.page = page;
    this.searchLocator = page.locator('//input[@placeholder="What are you looking for?"]');
    this.productList = page.locator('//div[@class="plp-product-list__products "]');
    this.productTitle = page.locator('//div[@class="plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]');
    this.productLink = page.locator('//div[@class="plp-fragment-wrapper"]/div/div[3]/a');
    this.showMore = page.locator('//span[@class="plp-btn__label" and contains(text(), "Show more")]');
  }

  async waitForResults() {
    try {
      await this.productList.first().waitFor({ timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }

  async isShowMoreAvailable() {
    try {
      const isVisible = await this.showMore.isVisible();
      const isDisabled = isVisible ? await this.showMore.isDisabled() : true;
      return isVisible && !isDisabled;
    } catch {
      return false;
    }
  }

  async goToNextPage() {
    try {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: "load", timeout: 10000 }),
        this.showMore.click(),
      ]);
      return true;
    } catch {
      return false;
    }
  }

  async getDetails() {
    const titles = await this.productTitle.all();
    const links = await this.productLink.all();
    const details = [];
    for (let i = 0; i < titles.length; i++) {
      const title = await titles[i].textContent();
      const link = await links[i].getAttribute("href");
      details.push({ title, link });
    }
    return details;
  }

  async clickNextButton(maxPages = 1) {
    const allDetails = [];
    let pagesClicked = 0;
    while (pagesClicked < maxPages) {
      if (this.page.isClosed()) break;
      const hasResults = await this.waitForResults();
      if (!hasResults) break;
      const details = await this.getDetails();
      allDetails.push(...details);
      const canClick = await this.isShowMoreAvailable();
      if (!canClick) break;
      const wentNext = await this.goToNextPage();
      if (!wentNext) break;
      pagesClicked++;
    }
    const csvData = convertToCSV(allDetails);
    const timestamp = getTimestamp();
    const filePath = path.join(__dirname, "..", "output", `bookshelves_${timestamp}.csv`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, csvData, "utf8");
    return pagesClicked;
  }
}
module.exports = { BookshelvesPage };
