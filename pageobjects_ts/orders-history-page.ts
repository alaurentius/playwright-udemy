import { Page, Locator } from "@playwright/test";

export class OrdersHistoryPage {
    private page: Page;
    private ordersIds: Locator;
    private viewBtns: Locator;
    private orderIdSummary: Locator;
    private tableBody: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersIds = page.locator('tbody tr th');
        this.viewBtns = page.locator('tbody tr td button.btn-primary');
        this.orderIdSummary = page.locator('.col-text');
        this.tableBody = page.locator('tbody');
    }

    async searchOrderAndSelect(orderId: string) {
        await this.tableBody.waitFor();

        for (let i = 0; i < await this.ordersIds.count(); ++i) {
            const rowOrderIdText = await this.ordersIds.nth(i).textContent();
            if (orderId.includes(rowOrderIdText)) {
                await this.viewBtns.nth(i).click();
                break;
            }
        }
    }

    async getOrderId(): Promise<string> {
        return await this.orderIdSummary.textContent();
    }
}
