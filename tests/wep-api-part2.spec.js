const { test, expect, request } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameEmail = '1RrKgVZUdVko@yopmail.com';
    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginBtn = page.locator('[value="Login"]')

    await page.goto('https://rahulshettyacademy.com/client');
    await userName.fill(usernameEmail);
    await password.fill('1RrKgVZUdVko');
    await loginBtn.click();
    await page.waitForLoadState('networkidle')

    await context.storageState({
        path: 'state.json'
    });

    webContext = await browser.newContext({
        storageState: 'state.json'
    })

})

test('Client App login - Session storage', async () => {

    const usernameEmail = '1RrKgVZUdVko@yopmail.com';
    const productName = 'ZARA COAT 3';

    const page = await webContext.newPage()
    const cartBtn = page.locator('[routerlink*="cart"]')
    const products = page.locator('.card-body')
    const cardTitles = page.locator('.card-body b')
    const cartItems = page.locator('div.cart li')
    const checkoutBtn = page.locator('text="Checkout"');
    const countryInput = page.locator('[placeholder*="Country"]');
    const countryResults = page.locator('.ta-results');
    const countryBtns = countryResults.locator('button');
    const usernameLabel = page.locator('.user__name label');
    const placeOrderBtn = page.locator('.action__submit');
    const thanksLabel = page.locator('.hero-primary');
    const orderIdLabel = page.locator('.em-spacer-1 .ng-star-inserted');
    const ordersBtn = page.locator('button[routerlink*="myorders"]')
    const ordersIds = page.locator('tbody tr th');
    const viewBtns = page.locator('tbody tr td button.btn-primary');
    const orderIdSummary = page.locator('.col-text');
    const tableBody = page.locator('tbody');

    await page.goto('https://rahulshettyacademy.com/client');
    const titles = await cardTitles.allTextContents();
    console.log(titles);
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await cardTitles.nth(i).textContent() === productName) {
            // add to cart
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await cartBtn.click();
    await cartItems.last().waitFor();
    const isProductVisible = await page.locator('h3:has-text("' + productName + '")').isVisible();
    expect(isProductVisible).toBeTruthy();
    await checkoutBtn.click();
    await countryInput.pressSequentially('ind', { delay: 150 });
    await countryResults.waitFor();
    const optionsCount = await countryBtns.count();
    for (let i = 0; i < optionsCount; ++i) {
        if (await countryBtns.nth(i).textContent() === ' India') {
            await countryBtns.nth(i).click();
            break;
        }
    }

    expect(usernameLabel).toHaveText(usernameEmail);
    await placeOrderBtn.click();
    await expect(thanksLabel).toHaveText(' Thankyou for the order. ');
    const orderId = await orderIdLabel.textContent();
    console.log(orderId);
    await ordersBtn.click();
    await tableBody.waitFor();

    for (let i = 0; i < await ordersIds.count(); ++i) {
        const rowOrderIdText = await ordersIds.nth(i).textContent();
        console.log(rowOrderIdText);
        if (orderId.includes(rowOrderIdText)) {
            await viewBtns.nth(i).click();
            break;
        }
    }
    const orderIdSummaryText = await orderIdSummary.textContent();
    expect(orderId.includes(orderIdSummaryText)).toBeTruthy();

});