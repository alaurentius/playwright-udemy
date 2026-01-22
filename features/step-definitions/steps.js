const { When, Then, Given } = require('@cucumber/cucumber')
const PoManager = require('../../pageobjects/po-manager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('I am logged in to ecommerce application with {string} and {string}', { timeout: 60 * 1000 }, async function (username, password) {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new PoManager(page);

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo('https://rahulshettyacademy.com/client');
    await loginPage.login(username, password);

});

When('{string} is added to the cart', { timeout: 60 * 1000 }, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    console.log(productName);
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', { timeout: 60 * 1000 }, async function (productName) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.verifyProductIsDisplayed(productName);
    await this.cartPage.checkout();
});

When('enter valid details and place the order', { timeout: 60 * 1000 }, async function () {
    this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.submitAndGetOrderId();
    console.log(this.orderId);
});

Then('verify order is present in the orders history', { timeout: 60 * 1000 }, async function () {
    await this.poManager.getDashboardPage().navigateToOrders();
    this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
});