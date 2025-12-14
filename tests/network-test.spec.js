const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/api-utils')

const loginPayload = { userEmail: "1RrKgVZUdVko@yopmail.com", userPassword: "1RrKgVZUdVko" }
const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] }
const fakePayloadOrders = { data: [], message: "No Orders" }
let response


test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(createOrderPayload);
})

test('Network interception test - API', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    const ordersBtn = page.locator('button[routerlink*="myorders"]')
    const messageElement = page.locator('.mt-4');
    const orderURL = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
    const messageLabelText = "You have No Orders to show at this time. Please Visit Back Us"

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route(orderURL,
        async route => {
            // intercepting response - API response -> {modified response} -> browser -> render data on front
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayloadOrders)
            route.fulfill(
                {
                    response,
                    body
                }
            )
        }
    )

    await ordersBtn.click()
    await page.waitForResponse(orderURL)
    console.log(await messageElement.textContent())
    expect(await messageElement.textContent()).toContain(messageLabelText)

})

