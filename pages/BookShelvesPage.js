const fs = require('fs');
const path = require('path');
const BasePage = require('../pages/BasePage');
class BooksPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
        this.searchLocator = page.locator('//input[@placeholder = "What are you looking for?"]');
        this.productList = this.page.locator('//div[@class = "plp-product-list__products "]');
        this.productTitle = this.page.locator('//div[@class = "plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]');
        this.productLink = this.page.locator('//div[@class = "plp-fragment-wrapper"]/div/div[3]/a');
        this.productPrice = this.page.locator('');

        this.showMore = this.page.locator('//span[@class = "plp-btn__label" and contains(text(), "Show more")]');
        this.data = [];
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

    async waitForResults() {
        try {
          await this.productList.first().waitFor({ timeout: 15000 });
          return true;
        } catch (err) {
          console.warn("Search results not found: " , err.message);
          return false;
        }
    }

    async isshowMoreButtonAvailable(){
        try {
            const isVisible = await this.showMore.isVisible();
            const isDisabled = isVisible ? await this.showMore.isDisabled() : true;
            return isVisible && !isDisabled;
        } catch (err) {
            console.warn('Error checking for next button :', err.message);
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
          console.error("Error during navigation to next page: " ,err.message);
          return false;
        }
    }

    async getDetails(){
        const itemDetails = [];
        const productTitle = await this.productTitle.all();
        const productLink = await this.productLink.all();
        // const productPrice = await this.productPrice.all();

        try{
            for (let i = 0; i < productTitle.length; i++) {
                const title = await productTitle[i].textContent();
                const link = await productLink[i].getAttribute('href');
                // const price = await this.productPrice[i];
                itemDetails.push({title, link});
            }
        }
        catch(err){
            console.error('Error getting for product details:', err.message);
        }
        return itemDetails;
    }


    async clickNextButton(){
        let pageNum = 1;
        let count = 0;
        while(true){
            if (this.page.isClosed()) {
                console.warn('Page is closed');
                break;
            }
            const hasResults = await this.waitForResults();
            // console.log(hasResults);
            if (!hasResults) {
                console.log('No results found.');
                break;
            }

            const allDetails = await this.getDetails();
            // console.log(allDetails);
            // console.log('Details length:', allDetails.length);

            const data = [];
            allDetails.forEach(item =>{
                data.push({...item});
                console.log(`Title: ${item.title} | Link: ${item.link}`);
            })

            if(await this.isshowMoreButtonAvailable()){
                await this.goToNextPage();
            }
            else{
                break;
            }
            pageNum++;
            count++;
        }
        return count;
    }
}

module.exports = BooksPage;
