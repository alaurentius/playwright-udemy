const { test, expect } = require('@playwright/test');
const PoManager = require('../pageobjects/po-manager');

test('Rahul Shetty Academy Practice Test - Verify iPhone X', async ({ page }) => {
    const poManager = new PoManager(page);
    const loginPage = poManager.getLoginPagePractise();
    const shopPage = poManager.getShopPage();

    await loginPage.goTo();

    await loginPage.validLogin('rahulshettyacademy', 'Learning@830$3mK2');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');

    const isPresent = await shopPage.verifyProductIsPresent('iphone X');
    expect(isPresent).toBeTruthy();
});
