const { test, expect } = require('@playwright/test');

test('Dynamically Waits Test', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');
    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginBtn = page.locator('[value="Login"]')
    const cardTitles = page.locator('.card-body b')

    await userName.fill('anshika@gmail.com');
    await password.fill('Iamking@000');
    await loginBtn.click();
    // await page.waitForLoadState('networkidle'); // discouraged in playwright docs
    // await cardTitles.waitFor(); // works only for single element
    await cardTitles.last().waitFor();
    const titles = await cardTitles.allTextContents();
    console.log(titles);
});

