const { test, expect } = require('@playwright/test');

test('Abort network calls Test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // block any image url
    page.route('**/*.{jpg,png,jpeg}', route => {
        route.abort()
    })

    const userName = page.locator('#username')
    const password = page.locator('[type="password"]')
    const signInBtn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')
    page.on('request', request => {
        console.log(request.url())
    })
    page.on('response', response => {
        console.log(
            response.url(),
            response.status()
        )
    })
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
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles)
});
