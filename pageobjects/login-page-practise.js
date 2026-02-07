class LoginPagePractise {

    constructor(page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.password = page.locator('#password');
        this.terms = page.locator('#terms');
        this.signInBtn = page.locator('#signInBtn');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.terms.check();
        await this.signInBtn.click();
    }
}

module.exports = LoginPagePractise;
