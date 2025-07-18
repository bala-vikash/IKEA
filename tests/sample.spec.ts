import { Homepage } from "../pages/Homepage";
import { test } from "@playwright/test";

test("Search for bookshelves on IKEA", async ({ page }) => {
    const h = new Homepage(page);

    await h.navigate();
    await h.searchBookShelves();
    await h.searchStudyChair();
    await h.getCollections();
});
