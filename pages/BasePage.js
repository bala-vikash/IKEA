//Locators page
const locators = require('../pages/LocatorsPage');
class BasePage{
    constructor(page){
        this.page = page;

        this.searchLocator = page.locator('//input[@placeholder = "What are you looking for?"]');
        this.productList = this.page.locator('//div[@class = "plp-product-list__products "]');
        this.productTitle = this.page.locator('//div[@class = "plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]');
        this.productLink = this.page.locator('//div[@class = "plp-fragment-wrapper"]/div/div[3]/a');
        this.productPrice = this.page.locator('//span[@class="plp-price__integer"]');
        this.showMore = this.page.locator('//span[@class = "plp-btn__label" and contains(text(), "Show more")]');
    }

    async selectLocators(locatorXpath){
        const locator = this.page.locator(locatorXpath);
        return locator;
    }
}

module.exports = BasePage;