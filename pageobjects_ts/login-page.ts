import { Page, Locator } from "@playwright/test";

export class LoginPage {

    private page: Page;
    private loginBtn: Locator;
    private userName: Locator;
    private password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.locator('[value="Login"]')
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
    }

    async login(usernameEmail: string, password: string) {
        await this.userName.fill(usernameEmail);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo(url: string) {
        await this.page.goto(url);
    }
}
