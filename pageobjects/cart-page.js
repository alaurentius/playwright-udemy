const { expect } = require("@playwright/test");

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('div.cart li')
        this.checkoutBtn = page.locator('text="Checkout"');
    }

    async verifyProductIsDisplayed(productName) {
        await this.cartItems.last().waitFor();
        const isProductVisible = await this.page.locator('h3:has-text("' + productName + '")').isVisible();
        expect(isProductVisible).toBeTruthy();
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}

module.exports = CartPage;