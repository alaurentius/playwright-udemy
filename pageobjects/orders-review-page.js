const { expect } = require("@playwright/test");

class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.countryResults = page.locator('.ta-results');
        this.countryInput = page.locator('[placeholder*="Country"]');
        this.countryBtns = this.countryResults.locator('button');
        this.usernameLabel = page.locator('.user__name label');
        this.placeOrderBtn = page.locator('.action__submit');
        this.thanksLabel = page.locator('.hero-primary');
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName) {
        await this.countryInput.pressSequentially(countryCode, { delay: 150 });
        await this.countryResults.waitFor();
        const optionsCount = await this.countryBtns.count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.countryBtns.nth(i).textContent();
            if (text.trim() === countryName) {
                await this.countryBtns.nth(i).click();
                break;
            }
        }
    }

    async verifyEmailId(usernameEmail) {
        await expect(this.usernameLabel).toHaveText(usernameEmail);
    }

    async submitAndGetOrderId() {
        await this.placeOrderBtn.click();
        await expect(this.thanksLabel).toHaveText(' Thankyou for the order. ');
        return await this.orderId.textContent();
    }
}

module.exports = OrdersHistoryPage;