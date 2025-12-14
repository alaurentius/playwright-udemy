const { test, expect } = require('@playwright/test');
const PoManager = require('../pageobjects/po-manager');

test('Client App login', async ({ page }) => {

    const poManager = new PoManager(page);

    const usernameEmail = '1RrKgVZUdVko@yopmail.com';
    const password = '1RrKgVZUdVko';
    const productName = 'ZARA COAT 3';

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
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.submitAndGetOrderId(usernameEmail);
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
