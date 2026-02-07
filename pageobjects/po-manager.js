const LoginPage = require('./login-page');
const DashboardPage = require('./dashboard-page');
const CartPage = require('./cart-page');
const OrdersHistoryPage = require('./orders-history-page');
const OrdersReviewPage = require('./orders-review-page');
const LoginPagePractise = require('./login-page-practise');
const ShopPage = require('./shop-page');

class PoManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.loginPagePractise = new LoginPagePractise(this.page);
        this.shopPage = new ShopPage(this.page);
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

    getLoginPagePractise() {
        return this.loginPagePractise;
    }

    getShopPage() {
        return this.shopPage;
    }
}

module.exports = PoManager;