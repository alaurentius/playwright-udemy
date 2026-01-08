import { Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { DashboardPage } from "./dashboard-page";
import { CartPage } from "./cart-page";
import { OrdersHistoryPage } from "./orders-history-page";
import { OrdersReviewPage } from "./orders-review-page";

export class PoManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    ordersHistoryPage: OrdersHistoryPage;
    ordersReviewPage: OrdersReviewPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}