import { expect, type Locator, type Page } from '@playwright/test';

let messageTs: string = "Hello World from TS";
messageTs = "2";

let ageTs: number = 2;

let booleanTs: boolean = true;

let numbersTs: number[] = [1, 2, 3];

let anyArray: any[] = [1, 2, "a", false];

let anyTs: any = "random";

console.log(messageTs);
console.log(ageTs);
console.log(booleanTs);
console.log(numbersTs);
console.log(anyArray);
console.log(anyTs);

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(1, 2));

let user: { name: string, age: number } = { name: "John", age: 30 };
// user.location = "New York";
console.log(user);

class CartPage {
    page: Page;
    cartItems: Locator;
    checkoutBtn: Locator;
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

