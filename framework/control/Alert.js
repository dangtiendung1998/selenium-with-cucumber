const {getDriver} = require("../core/driverWrapper");
const {until} = require("selenium-webdriver");

class Alert {
    constructor() {
        this.driver = getDriver()
        this.alert = this.driver.switchTo().alert()
    }

    async wait(timeout = 30000, message = 'Wait for the alert to be displayed') {
        await this.driver.wait(until.alertIsPresent(), timeout, message)
        return this;
    }

    async sendKeys(args) {
        return await this.alert.sendKeys(args)
    }

    async getText() {
        return await this.alert.getText()
    }

    async dismiss() {
        return await this.alert.dismiss();
    }

    async accept() {
        return await this.alert.accept();
    }
}

module.exports = {Alert}
