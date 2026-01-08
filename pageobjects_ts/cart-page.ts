import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
    private page: Page;
    private cartItems: Locator;
    private checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('div.cart li')
        this.checkoutBtn = page.locator('text="Checkout"');
    }

    async verifyProductIsDisplayed(productName: string) {
        await this.cartItems.last().waitFor();
        const isProductVisible = await this.page.locator('h3:has-text("' + productName + '")').isVisible();
        expect(isProductVisible).toBeTruthy();
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}