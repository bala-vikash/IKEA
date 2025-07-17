
class LocatorsPage{
    constructor(page){
        this.page = page;
        this.locators = {
            searchLocator: page.locator('//input[@placeholder = "What are you looking for?"]'),
            productList: page.locator('//div[@class = "plp-product-list__products "]'),
            productTitle: page.locator('//div[@class = "plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]'),
            productLink: page.locator('//div[@class = "plp-fragment-wrapper"]/div/div[3]/a'),
            showMore: page.locator('//span[@class = "plp-btn__label" and contains(text(), "Show more")]'),
        }
    }
};
module.exports = LocatorsPage;
