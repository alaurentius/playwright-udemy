const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright Test', async ({ browser }) => {

    // These can be defined, or passed in as fixtures and it will use default config
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshetty');
    await page.locator('[type="password"]').fill('learning');
    await page.locator('#signInBtn').click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]').textContent() ).toContain('Incorrect username/password.');
});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://www.google.com');
    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});