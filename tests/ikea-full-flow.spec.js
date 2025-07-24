const { test } = require("@playwright/test");
const { Homepage } = require("../pages/Homepage");
const { BookshelvesPage } = require("../pages/BookShelvesPage");
const { GiftcardPage } = require("../pages/GiftcardPage");
const { PaymentPage } = require("../pages/Paymentpage");
const { StudyPage } = require("../pages/Studychairpage");

test("Complete IKEA automation flow", async ({ page }) => {
  const homepage = new Homepage(page);
  const booksPage = new BookshelvesPage(page);
  const giftcard = new GiftcardPage(page);
  const payment = new PaymentPage(page);
  const studypage = new StudyPage(page);

  // Homepage navigation and BookShelves search
  await homepage.navigate();
  await homepage.getCollections();
  await homepage.searchBookShelves();
  await booksPage.clickNextButton(2);

  // Study Chair search
  await homepage.navigate();
  await homepage.searchStudyChair();
  await studypage.allFilter();
  await studypage.rating();
  await studypage.checkRating();
  await studypage.viewAll();
  await studypage.chairCards();
  //await homepage.searchStudyChair();
  // await booksPage.clickNextButton();

  // Gift card flow via homepage
  await homepage.navigate();
  await homepage.clickOnGift();
  await giftcard.giftCardClick();
  await giftcard.selectGiftCardAmount(5000);
  await giftcard.fillDetails("sai", "Gangu", "sai@gmail.com", "sai@gmail.com", "someone");
  await giftcard.yourDetails("vikash", "Bala", "vikash@gmail.com", "vikash@gmail.com");

  // Payment flow
  await payment.fillCardDetails("2345678937686576", "sai", "199");
  await payment.validateCardNumberError();
});
