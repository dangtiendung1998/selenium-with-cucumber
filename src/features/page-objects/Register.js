const {BasePage} = require("./BasePage");
const {HtmlElement} = require("../../../framework/control/HtmlElement");
const {expect} = require("chai")
const {By} = require("selenium-webdriver");
const {Input} = require("../../../framework/control/Input");
const {getDriver} = require("../../../framework/core/driverWrapper");

class Register extends BasePage {
    constructor() {
        super();
        this.signUpLink = () => new HtmlElement(By.css('a[href="/signup"]'))
        this.formTitle = () => new HtmlElement(By.xpath('//h1[contains(text(), "Create a new account")]'))
        this.emailInput = () => new Input(By.css('input[name=email]'));
        this.firstnameInput = () => new Input(By.css('input[name=firstName]'));
        this.lastnameInput = () => new Input(By.css('input[name=lastName]'));
        this.passwordInput = () => new Input(By.css('input[name=password]'));
        this.confirmPasswordInput = () => new Input(By.css('input[name=confirmPassword]'));
        this.submitButton = () => new Input(By.css('button[type=submit]'));
    }

    async goToUrl(url) {
        await getDriver().get(url)
    }

    async clickSignUpLink() {
        await this.signUpLink().waitForElementVisible();
        await this.signUpLink().click();
    }

    async verifyPageTitle(expTitle) {
        await this.formTitle().waitForElementVisible();
        let isDisplayed = await this.formTitle().isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async enterNewAccount(email, firstname, lastname, password, confirmPassword) {
        await this.emailInput().waitForElementVisible();
        await this.emailInput().type(email);
        await this.firstnameInput().waitForElementVisible();
        await this.firstnameInput().type(firstname);
        await this.lastnameInput().waitForElementVisible();
        await this.lastnameInput().type(lastname);
        await this.passwordInput().waitForElementVisible();
        await this.passwordInput().type(password);
        await this.confirmPasswordInput().waitForElementVisible();
        await this.confirmPasswordInput().type(confirmPassword);
    }

    async clickSubmitBtn() {
        await this.submitButton().waitForElementVisible();
        await this.submitButton().click();
        await getDriver().sleep(5000);
    }

    async verifyLoginPageDisplayed() {

    }

    async enterSignIn(email, password) {
        await this.emailInput().waitForElementVisible();
        await this.emailInput().type(email);
        await this.passwordInput().waitForElementVisible();
        await this.passwordInput().type(password);
    }

    async verifyLoginSuccess() {
        await getDriver().sleep(10000);
    }
}

module.exports = {
    Register: Register
}
