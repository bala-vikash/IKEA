import {test,expect} from '@playwright/test';
const BooksPage = require('../pages/BookShelvesPage');

// console.log(BooksPage);


test('Navigation test', async({page}) =>{

    let booksPage;
    // Navigate to URL
    await page.goto('https://www.ikea.com/in/en/', { waitUntil: 'domcontentloaded' });

    // Assertions 
    await expect(page).toHaveTitle(/IKEA/);
    await expect(page).toHaveURL('https://www.ikea.com/in/en/');


    booksPage = new BooksPage(page);
    await booksPage.clickSearch();
    await booksPage.fill("Book Shelves");
    await booksPage.submitSearch();

    // console.log(await booksPage.waitForResults());
    // console.log(await booksPage.isshowMoreButtonAvailable);
    // console.log(await booksPage.goToNextPage());
    console.log(await booksPage.clickNextButton());

    // const tag = page.locator('//div[@class = "plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]');
    // console.log(tag.elementHandle.length);

    // await page.pause();
});