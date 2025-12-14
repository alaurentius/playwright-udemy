const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/api-utils')

const loginPayload = { userEmail: "1RrKgVZUdVko@yopmail.com", userPassword: "1RrKgVZUdVko" }
const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] }
let response

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(createOrderPayload);
})

test('Place order - API', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    const ordersBtn = page.locator('button[routerlink*="myorders"]')
    const tableBody = page.locator('tbody');
    const ordersIds = page.locator('tbody tr th');
    const orderIdSummary = page.locator('.col-text');
    const viewBtns = page.locator('tbody tr td button.btn-primary');

    await page.goto("https://rahulshettyacademy.com/client");

    await ordersBtn.click();
    await tableBody.waitFor();

    for (let i = 0; i < await ordersIds.count(); ++i) {
        const rowOrderIdText = await ordersIds.nth(i).textContent();
        console.log(rowOrderIdText);
        if (response.orderId.includes(rowOrderIdText)) {
            await viewBtns.nth(i).click();
            break;
        }
    }
    const orderIdSummaryText = await orderIdSummary.textContent();
    expect(response.orderId.includes(orderIdSummaryText)).toBeTruthy();
})

