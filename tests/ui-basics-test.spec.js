const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright Test', async ({ browser }) => {

    // These can be defined, or passed in as fixtures and it will use default config
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username')
    const password = page.locator('[type="password"]')
    const signInBtn = page.locator('#signInBtn')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signInBtn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect username/password.');
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signInBtn.click();
    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').last().textContent());
});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://www.google.com');
    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});