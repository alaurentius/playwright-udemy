const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "1RrKgVZUdVko@yopmail.com", userPassword: "1RrKgVZUdVko" }
let token;

test.beforeAll(async () => {

    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token;
    console.log(token)
})

test.beforeEach(() => {

})

test('Client App login - API', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({ hasText: productName })
        .getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})
