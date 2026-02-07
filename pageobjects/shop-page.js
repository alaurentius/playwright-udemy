class ShopPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('app-card');
        this.productTitle = page.locator('.card-title a');
    }

    async verifyProductIsPresent(productName) {
        const titles = await this.productTitle.allTextContents();
        return titles.includes(productName);
    }
}

module.exports = ShopPage;
