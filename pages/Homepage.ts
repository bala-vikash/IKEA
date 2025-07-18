import { Page, Locator, expect } from "@playwright/test";

export class Homepage {
    //Define types of each variables at top level
    page: Page;
    url: string;
    searchBar: Locator;
    gift : Locator;
    collections : string;

    // Initiliasing variables with their locators
    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.ikea.com/in/en/";
        this.searchBar = this.page.locator("#ikea-search-input");
        this.gift = this.page.locator(
            'a[href="https://www.ikea.com/in/en/customer-service/ikea-gift-cards-pub004138e1/"]'
        );
        this.collections = '//div[contains(@id,"hnf-carousel__tabs-navigation-products")]/div/a/span';
    }

    // async methods define below  , these are invoked in spec/test file

    // This methods redirects to the IKEA WebPage
    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveTitle("IKEA India-Affordable home furniture, designs & ideas - IKEA");
    }
    
    //This method searches for Bookshelves
    async searchBookShelves() {
        await this.searchBar.click();
        await this.searchBar.fill("BookShelves");
        await this.page.keyboard.press("Enter");
    }

    //This method searches for StudyChair
    async searchStudyChair() {
        await this.searchBar.click();
        await this.searchBar.fill("Study Chair");
        await this.page.keyboard.press("Enter");
    }

    //This method fetches all the active links and collections displayed on the webpage
    async getCollections() {
    const collectionLocator = this.page.locator(this.collections);
    const collectionsCount = await collectionLocator.count();

    for (let i = 1; i < collectionsCount; i++) {
        const text = await collectionLocator.nth(i).textContent();
        console.log(text?.trim());
    }
    }

    // Clicks on gift carousel
    async clickOnGift()
    {
        await this.gift.click();
    }
}
