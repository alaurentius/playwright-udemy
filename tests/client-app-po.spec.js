const { test, expect } = require('@playwright/test');
const PoManager = require('../pageobjects/po-manager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/place-order-test-data.json')));

for (const data of dataSet) {
    test(`Client App login ${data.productName}`, async ({ page }) => {

        const poManager = new PoManager(page);

        const usernameEmail = data.usernameEmail;
        const password = data.password;
        const productName = data.productName;
        const countryCode = data.countryCode;
        const countryName = data.countryName;

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo('https://rahulshettyacademy.com/client');
        await loginPage.login(usernameEmail, password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(productName);
        await cartPage.checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);
        const orderId = await ordersReviewPage.submitAndGetOrderId(usernameEmail);
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });
}
