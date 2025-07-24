const { test } = require("@playwright/test");
const { Homepage } = require("../pages/Homepage");
const { BookshelvesPage } = require("../pages/BookShelvesPage");

test.describe("@sanity Homepage & Search Flow", () => {
  let homepage;
  let booksPage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    booksPage = new BookshelvesPage(page);
    await homepage.navigate();
  });

  // test("Should verify homepage title", async () => {
  //   await homepage.checkAssertions?.();
  // });

  test("Should list homepage collections", async () => {
    await homepage.getCollections();
  });

  test("Should search for bookshelves", async () => {
    await homepage.searchBookShelves();
  });

  test("Should extract bookshelf items into CSV", async () => {
    await homepage.searchBookShelves();
    await booksPage.clickNextButton(2);
  });
});
