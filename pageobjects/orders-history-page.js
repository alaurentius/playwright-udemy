class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersIds = page.locator('tbody tr th');
        this.viewBtns = page.locator('tbody tr td button.btn-primary');
        this.orderIdSummary = page.locator('.col-text');
        this.tableBody = page.locator('tbody');
    }

    async searchOrderAndSelect(orderId) {
        await this.tableBody.waitFor();

        for (let i = 0; i < await this.ordersIds.count(); ++i) {
            const rowOrderIdText = await this.ordersIds.nth(i).textContent();
            if (orderId.includes(rowOrderIdText)) {
                await this.viewBtns.nth(i).click();
                break;
            }
        }
    }

    async getOrderId() {
        return await this.orderIdSummary.textContent();
    }
}

module.exports = OrdersHistoryPage;
