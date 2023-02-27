const {getDriver} = require("../core/driverWrapper");
const {Navigation} = require("./navigation");
const {Alert} = require("./Alert");
const {until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");

class Browser {
    constructor() {
        this.driver = getDriver()
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

    async getCurrentUrl() {
        return await this.driver.getCurrentUrl()
    }

    async visitUrl(url) {
        return await this.driver.get(url)
    }

    async addCookie(arrCookie) {
        return await this.driver.manage().addCookie(arrCookie);
    }

    async getCookie(name) {
        return await this.driver.manage().getCookie(name).then((cookie) => {
            console.log('🚀 ~ browser.js getCookie by name: ', name, ' - result: ', cookie)
            return cookie;
        })
    }

    async getCookies() {
        return await this.driver.manage().getCookies().then((cookies) => {
            console.log('🚀 ~ browser.js getCookies by name: ', name, ' - result: ', cookies)
            return cookies;
        })
    }

    async switchToAlert() {
        return new Alert();
    }

    async switchToFrameByNameOrId(nameOrIdOrIndex) {
        return await this.driver.switchTo().frame(nameOrIdOrIndex)
    }

    async leaveFrame() {
        return await this.driver.switchTo().defaultContent();
    }

    async switchToWindowByNumber(number) {
        let handles = await this.driver.getAllWindowHandles()
        await this.driver.switchTo().window(handles[number]);
        return this;
    }

    async waitTitleIs(title, timeout = 30000, message = 'Wait for the title is') {
        await this.driver.wait(until.titleIs(title), timeout, message)
        return this;
    }

    async waitTitleContains(title, timeout = 30000, message = 'Wait for the title contains') {
        await this.driver.wait(until.titleContains(title), timeout, message)
        return this;
    }

    async closeWindowOrTab() {
        return await this.driver.close();
    }
}

module.exports = {Browser}
