module.exports = {
    searchInput: '//input[@placeholder = "What are you looking for?"]',
    productList: '//div[@class = "plp-product-list__products "]',
    productTitle: '//div[@class = "plp-mastercard__item plp-mastercard__price "]/a/div/div/h3/span[1]',
    productLink: '//div[@class = "plp-fragment-wrapper"]/div/div[3]/a',
    productPrice: '//span[@class="plp-price__integer"]',
    showMore: '//span[@class = "plp-btn__label" and contains(text(), "Show more")]'
};
