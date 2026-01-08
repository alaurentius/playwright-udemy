import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    private page: Page;
    private cartBtn: Locator;
    private products: Locator;
    private cardTitles: Locator;
    private ordersBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBtn = page.locator('[routerlink*="cart"]')
        this.products = page.locator('.card-body')
        this.cardTitles = page.locator('.card-body b')
        this.ordersBtn = page.locator('button[routerlink*="myorders"]')

    }

    async searchProduct(productName: string) {
        const titles = await this.cardTitles.allTextContents();
        console.log(titles);
        const count = await this.products.count();

        for (let i = 0; i < count; ++i) {
            if (await this.cardTitles.nth(i).textContent() === productName) {
                // add to cart
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cartBtn.click();
    }

    async navigateToOrders() {
        await this.ordersBtn.click();
    }
}