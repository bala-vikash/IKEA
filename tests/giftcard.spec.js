const { test } = require("@playwright/test");
const { Homepage } = require("../pages/Homepage");
const { GiftcardPage } = require("../pages/GiftcardPage");

test.describe("@smoke Gift Card Purchase Flow", () => {
  let homepage;
  let giftcard;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    giftcard = new GiftcardPage(page);
    await homepage.navigate();
    await homepage.clickOnGift();
    await giftcard.giftCardClick();
  });

  test("Should select gift card amount", async () => {
    await giftcard.selectGiftCardAmount(5000);
  });

  test("Should fill recipient details", async () => {
    await giftcard.selectGiftCardAmount(5000);
    await giftcard.fillDetails("Sai", "Gangu", "sai@gmail.com", "sai@gmail.com", "someone");
  });

  test("Should fill sender details", async () => {
    await giftcard.selectGiftCardAmount(5000);
    await giftcard.fillDetails("Sai", "Gangu", "sai@gmail.com", "sai@gmail.com", "someone");
    await giftcard.yourDetails("Vikash", "Bala", "vikash@gmail.com", "vikash@gmail.com");
  });

  test("Should complete gift card form with confirmation", async () => {
    await giftcard.selectGiftCardAmount(5000);
    await giftcard.fillDetails("Sai", "Gangu", "sai@gmail.com", "sai@gmail.com", "someone");
    await giftcard.yourDetails("Vikash", "Bala", "vikash@gmail.com", "vikash@gmail.com");
    // Add assertions if confirmation message appears
  });
});
