class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginBtn = page.locator('[value="Login"]')
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
    }

    async login(usernameEmail, password) {
        await this.userName.fill(usernameEmail);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo(url) {
        await this.page.goto(url);
    }
}

module.exports = LoginPage;
