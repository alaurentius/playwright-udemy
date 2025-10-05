const { test, expect, request } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {

    const usernameEmail = '1RrKgVZUdVko@yopmail.com';
    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginBtn = page.locator('[value="Login"]')
    const cardTitles = page.locator('.card-body b')
    const ordersBtn = page.locator('button[routerlink*="myorders"]')
    const viewButton = page.locator('button:has-text("View")')
    const labelMessage = page.locator('p.blink_me')
    const baseRouteURL = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?'
    const labelMessageText = 'You are not authorize to view this order'

    await page.goto('https://rahulshettyacademy.com/client');
    await userName.fill(usernameEmail);
    await password.fill('1RrKgVZUdVko');
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    await cardTitles.last().waitFor();
    await ordersBtn.click();

    await page.route(baseRouteURL + 'id=*',
        route => route.continue({
            url: baseRouteURL + 'id=68e2b28bf669d6cb0aff14ff'
        })
    )
    await viewButton.first().click()
    expect(await labelMessage.textContent()).toContain(labelMessageText)
})
