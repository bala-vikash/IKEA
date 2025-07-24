const { test } = require("@playwright/test");
const { Homepage } = require("../pages/Homepage");
const { StudyPage } = require("../pages/Studychairpage");

test.describe("@sanity Study Chair Filtering Flow", () => {
  let homepage;
  let studypage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    studypage = new StudyPage(page);
    await homepage.navigate();
    await homepage.searchStudyChair();
  });

  test("Should open All Filters panel", async () => {
    await studypage.allFilter();
  });

  test("Should apply customer rating filter", async () => {
    await studypage.allFilter();
    await studypage.rating();
    await studypage.checkRating();
  });

  test("Should view filtered products", async () => {
    await studypage.allFilter();
    await studypage.rating();
    await studypage.checkRating();
    await studypage.viewAll();
  });

  test("Should save chair details into CSV", async () => {
    await studypage.allFilter();
    await studypage.rating();
    await studypage.checkRating();
    await studypage.viewAll();
    await studypage.chairCards();
  });
});
