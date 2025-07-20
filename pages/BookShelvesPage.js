const fs = require('fs');
const path = require('path');
const BasePage = require('../pages/BasePage');

class BooksPage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
      this.searchLocator = page.locator('//input[@placeholder = "What are you looking for?"]');
      this.productList = this.page.locator('//div[@class = "plp-product-list__products "]');
      this.productTitle = this.page.locator('//div[@class = "plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]');
      this.productLink = this.page.locator('//div[@class = "plp-fragment-wrapper"]/div/div[3]/a');
      this.productPrice = this.page.locator('//span[@class="plp-price__integer"]');
      this.showMore = this.page.locator('//span[@class = "plp-btn__label" and contains(text(), "Show more")]');
    }

    async clickSearch() {
        await this.searchLocator.click();
    }

    async fill(inputText) {
        await this.searchLocator.fill(inputText);
    }

    async submitSearch() {
        await this.page.keyboard.press('Enter');
    }

    async performSearch(inputText) {
        await this.searchLocator.click();
        await this.searchLocator.fill(inputText);
        await this.page.keyboard.press('Enter');
    }

    async waitForResults() {
        try {
            await this.productList.first().waitFor({ timeout: 15000 });
            return true;
        } catch (err) {
            console.warn("Search results not found: ", err.message);
            return false;
        }
    }

    async isshowMoreButtonAvailable() {
        try {
            const isVisible = await this.showMore.isVisible();
            const isDisabled = isVisible ? await this.showMore.isDisabled() : true;
            return isVisible && !isDisabled;
        } catch (err) {
            console.warn('Error checking for next button:', err.message);
            return false;
        }
    }

    async goToNextPage() {
        try {
            await Promise.all([
              this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
              this.showMore.click()
            ]);
            return true;
        } catch (err) {
            console.error("Error during navigation to next page:", err.message);
            return false;
        }
    }

    async getDetails() {
        const itemDetails = [];
        const productTitle = await this.productTitle.all();
        const productLink = await this.productLink.all();
        const productPrice = await this.productPrice.all();

        try {
          for (let i = 0; i < productTitle.length; i++) {
                const title = await productTitle[i].textContent();
                const link = productLink[i] ? await productLink[i].getAttribute('href') : '';
                const price = productPrice[i] ? (await productPrice[i].innerText()).trim() : 'No price';
                itemDetails.push({ title, link, price });
          }
        } catch (err) {
          console.error('Error getting product details:', err.message);
        }

        return itemDetails;
    }

    async saveDataToFile(data, filename = 'results.json') {
      try {
        const outputPath = path.resolve(__dirname, `../data/${filename}`);
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Data saved to ${outputPath}`);
        return true;
      } catch (err) {
        console.error(`Failed to save data: ${err.message}`);
        return false;
      }
    }

    async scrapeAllPages(maxPages = null) {
      let pageNum = 1;
      let allData = [];

      while (true) {
        if (this.page.isClosed()) {
          console.warn('Page is closed');
          break;
        }

        if (maxPages !== null && pageNum > maxPages) {
          console.log(`Max number of pages reached: ${pageNum - 1}`);
          break;
        }

        console.log(`\nScraping Page ${pageNum}...`);

        const hasResults = await this.waitForResults();
        if (!hasResults) {
          console.log('No results found.');
          break;
        }

        const pageDetails = await this.getDetails();

        pageDetails.forEach(item => {
          console.log(`Title: ${item.title} | Link: ${item.link} | Price: ${item.price}`);
        });

        allData.push(...pageDetails);

        // Save the data after each page
        await this.saveDataToFile(allData);

        if (await this.isshowMoreButtonAvailable()) {
          const nextPageSuccess = await this.goToNextPage();
          if (!nextPageSuccess) break;
        } else {
          break;
        }

        pageNum++;
      }

      console.log("Successfully scraped all pages.");
      return allData;
    }

    async pagination(noOfPages) {
      return await this.scrapeAllPages(noOfPages);
    }
}   

module.exports = BooksPage;
