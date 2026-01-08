import { Page, Locator, expect } from "@playwright/test";

export class OrdersReviewPage {
    private page: Page;
    private countryResults: Locator;
    private countryInput: Locator;
    private countryBtns: Locator;
    private usernameLabel: Locator;
    private placeOrderBtn: Locator;
    private thanksLabel: Locator;
    private orderId: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryResults = page.locator('.ta-results');
        this.countryInput = page.locator('[placeholder*="Country"]');
        this.countryBtns = this.countryResults.locator('button');
        this.usernameLabel = page.locator('.user__name label');
        this.placeOrderBtn = page.locator('.action__submit');
        this.thanksLabel = page.locator('.hero-primary');
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode: string, countryName: string) {
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

    async verifyEmailId(usernameEmail: string) {
        await expect(this.usernameLabel).toHaveText(usernameEmail);
    }

    async submitAndGetOrderId(): Promise<string> {
        await this.placeOrderBtn.click();
        await expect(this.thanksLabel).toHaveText(' Thankyou for the order. ');
        return await this.orderId.textContent();
    }
}