const playwright = require('@playwright/test');
const PoManager = require('../../pageobjects/po-manager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new PoManager(this.page);
});


After(function () {
    console.log("After hook executed");
});

BeforeStep({}, function () {
    console.log("BeforeStep hook executed");
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'temp/error-screenshot.png' });
    }
});