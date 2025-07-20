import {test,expect} from '@playwright/test';
const BooksPage = require('../pages/BookShelvesPage');
const convertToCSV = require('../utils/csvWriter');
const data = require('../data/results.json');

const fs = require('fs');
const path = require('path');

// console.log(BooksPage);
// console.log(convertToCSV);

let results = [];

test.describe('IKEA Advanced Search test', () => {

    let booksPage, studychair;  

    const searchCriteria = {
        BookSheleves : "Book Shelves",
        StudyChair : "Study Chair"
    };

    test.beforeEach(async({page}) =>{
        // define all pages here
        booksPage = new BooksPage(page);
        // studychair = new StudyChair(page);

    });


    test("Navigate to Website", async({page}) => {

        const noOfPages = 1;

        // Navigate to URL
        await page.goto('https://www.ikea.com/in/en/', { waitUntil: 'domcontentloaded' });

        // Assertions 
        await expect(page).toHaveTitle(/IKEA/);
        await expect(page).toHaveURL('https://www.ikea.com/in/en/');


        await booksPage.clickSearch();
        await booksPage.fill("Book Shelves");
        await booksPage.submitSearch();
        // results = await booksPage.scrapeAllPages(2); 


        results = await booksPage.pagination(noOfPages);

        // Assertion
        // expect(results.length).toBeGreaterThan(0);
    });

    /*\
        test("Assertions", async({page}) =>{
            // Assertions 
            await expect(page).toHaveTitle(/IKEA/);
            await expect(page).toHaveURL('https://www.ikea.com/in/en/');
        });
    */

    test.afterAll(() => {
        if (results.length > 0) {
          const csvData = convertToCSV(results);
        
          const csvPath = path.resolve(__dirname, '../data/ikea_bookshelves.csv');
          const dir = path.dirname(csvPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
      
          fs.writeFileSync(csvPath, csvData);
          console.log(`CSV file saved to ${csvPath}`);
        } else {
          console.log('No data scraped, CSV not saved.');
        }
    });



    console.log("All tests Completed Successfully!");
});