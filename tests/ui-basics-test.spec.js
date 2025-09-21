const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {

    // These can be defined, or passed in as fixtures and it will use default config
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username')
    const password = page.locator('[type="password"]')
    const signInBtn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')
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
    const allTitles = await cardTitles.allTextContents(); // this metod will not wait by itself until all text contents are retrieved
    console.log(allTitles)
});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://www.google.com');
    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('UI Controls', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const userName = page.locator('#username')
    const password = page.locator('[type="password"]')
    const signInBtn = page.locator('#signInBtn')
    const dropdown = page.locator('select.form-control')
    const radioBtns = page.locator('.radiotextsty')
    const termsCheck = page.locator('#terms')
    const docLink = page.locator("[href*='documents-request']")
    await dropdown.selectOption('consult') // value attribute
    // await page.pause();
    await radioBtns.last().click()
    await page.locator('#okayBtn').click()
    // assertion
    await expect(radioBtns.last()).toBeChecked() // await is needed when performing actions. Tobechecked is an action
    await termsCheck.click()
    await expect(termsCheck).toBeChecked() // same here
    await termsCheck.uncheck()
    expect(await termsCheck.isChecked()).toBeFalsy(); // in this case await is inside because isChecked is the action
    await expect(docLink).toHaveAttribute("class", "blinkingText")
});

test('Child Windows Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const docLink = page.locator("[href*='documents-request']")
    // Promises: pending/rejected/fulfilled
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for any new page. No need await. This will be run in paralell with the dockick.click()
        docLink.click() // listener is ready to get the page that will be opened
    ]); // it won't go to next steps until all promises are fulfilled

    const text = await newPage.locator(".red").textContent()
    const extractedText = text.split("@")[1].split(" ")[0]
    console.log(extractedText)
    await userName.fill(extractedText);
    await page.pause()
    console.log(await userName.textContent())
    console.log(await userName.inputValue())
});