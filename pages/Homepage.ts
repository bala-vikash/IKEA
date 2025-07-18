import { Page, Locator, expect } from "@playwright/test";

export class Homepage {
    page: Page;
    url: string;
    searchBar: Locator;
    gift : Locator;
    collections : string;

    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.ikea.com/in/en/";
        this.searchBar = this.page.locator("#ikea-search-input");
        this.gift = this.page.locator(
            'a[href="https://www.ikea.com/in/en/customer-service/ikea-gift-cards-pub004138e1/"]'
        );
        this.collections = '//div[contains(@id,"hnf-carousel__tabs-navigation-products")]/div/a/span';
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveTitle("IKEA India-Affordable home furniture, designs & ideas - IKEA");
    }

    async searchBookShelves() {
        await this.searchBar.click();
        await this.searchBar.fill("BookShelves");
        await this.page.keyboard.press("Enter");
    }

    async searchStudyChair() {
        await this.searchBar.click();
        await this.searchBar.fill("Study Chair");
        await this.page.keyboard.press("Enter");
    }

    async getCollections() {
    const collectionLocator = this.page.locator(this.collections);
    const collectionsCount = await collectionLocator.count();

    for (let i = 1; i < collectionsCount; i++) {
        const text = await collectionLocator.nth(i).textContent();
        console.log(text?.trim());
    }
    }


    async clickOnGift()
    {
        await this.gift.click();
    }
}
