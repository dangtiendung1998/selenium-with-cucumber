const {getDriver} = require("../core/driverWrapper");
const {until} = require("selenium-webdriver");

class HtmlElement {
    constructor(selector) {
        this.driver = getDriver();
        this.actions = this.driver.actions({async: true});
        this.selector = selector;
        // this.element = this.driver.findElement(this.selector);
        this.id = selector.id ?? null;
    }

    async waitForElementVisible(timeout = 30000, message = 'timeout wait element', pollTimeout = 500) {
        await this.driver.wait(until.elementLocated(this.selector), timeout, message, pollTimeout);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.selector)), timeout, message, pollTimeout);
        return this;
    }

    async waitForElementNotVisible(timeout = 30000, message = 'timeout wait element', pollTimeout = 500) {
        await this.driver.wait(until.elementLocated(this.selector), timeout, message, pollTimeout);
        await this.driver.wait(until.elementIsNotVisible(await this.driver.findElement(this.selector)), timeout, message, pollTimeout);
        return this;
    }

    async waitForElementByTextIs(text, timeout = 30000, message = 'timeout wait for element by text is') {
        await this.waitForElementVisible();
        await this.driver.wait(
            until.elementTextIs(await this.driver.findElement(this.selector), text),
            timeout,
            message + ' visible: ' + this.selector
        );
    }

    async waitForElementByTextContains(subText, timeout = 30000, message = 'timeout wait for element by text contains') {
        await this.waitForElementVisible();
        await this.driver.wait(
            until.elementTextContains(await this.driver.findElement(this.selector), subText),
            timeout,
            message + ' visible: ' + this.selector
        );
    }

    async waitForElementByTextMatches(regex, timeout = 30000, message = 'timeout wait for element by text matches') {
        await this.waitForElementVisible();
        await this.driver.wait(
            until.elementTextMatches(await this.driver.findElement(this.selector), regex),
            timeout,
            message + ' visible: ' + this.selector
        );
    }

    async waitForElementByTextStartsWith(text, timeout = 30000, message = 'timeout wait for element by text startsWith') {
        await this.waitForElementVisible();
        await this.driver.wait(async () => {
                let elemText = await this.driver.findElement(this.selector).getText();
                return elemText.trim().startsWith(text);
            },
            timeout,
            message + ' visible: ' + this.selector
        );
    }

    async waitForElementByTextEndsWith(text, timeout = 30000, message = 'timeout wait for element by text startsWith') {
        await this.waitForElementVisible();
        await this.driver.wait(async () => {
                let elemText = await this.driver.findElement(this.selector).getText();
                return elemText.trim().endsWith(text);
            },
            timeout,
            message + ' visible: ' + this.selector
        );
    }

    async firstElement() {
        this.element = await this.driver.findElement(this.selector);
        return this;
    }

    async lastElement() {
        let elements = await this.driver.findElements(this.selector);
        this.element = elements[elements.length - 1];
        return this;
    }

    async clear() {
        await this.driver.findElement(this.selector).clear();
    }

    async click() {
        await this.driver.findElement(this.selector).click();
    }

    async hoverAble() {
        await this.actions().move({origin: await this.driver.findElement(this.selector)}).perform();
    }

    async doubleClick() {
        await this.actions.doubleClick(await this.driver.findElement(this.selector)).perform();
    }

    async contextClick() {
        await this.actions.contextClick(await this.driver.findElement(this.selector)).perform();
    }

    async clickAndHold() {
        // click mouse left
        await this.actions.move({origin: await this.driver.findElement(this.selector)}).press().perform()
    }

    async clickAndRelease() {
        // click mouse left
        await this.actions.move({origin: await this.driver.findElement(this.selector)}).click().perform();
    }

    async dragAndDropOnElement(draggable, droppable) {
        await this.actions.dragAndDrop(draggable, droppable).perform();
    }

    async dragAndDropOnOffset(draggable, droppable) {
        let start = await draggable.getRect();
        let finish = await droppable.getRect();
        await this.actions.dragAndDrop(draggable, {x: finish.x - start.x, y: finish.y - start.y}).perform();
    }

    async scrollToElement() {
        await this.actions.scroll(0, 0, 0, 0, await this.driver.findElement(this.selector)).perform()
    }

    // async sendFiles(filename) {
    //     const path = require('path');
    //     const remote = require('selenium-webdriver/remote');
    //     await getDriver().setFileDetector(new remote.FileDetector());
    //     const absolutePath = path.resolve(__dirname, '../../setup/testdata/attachments/' + filename);
    //     await this.sendKeys(absolutePath);
    // }

    async filterByText() {

    }

    async getAttribute(attributeName) {
        return await this.driver.findElement(this.selector).getAttribute(attributeName);
    }

    async getCssValue(cssPropertyKey) {
        return await this.driver.findElement(this.selector).getCssValue(cssPropertyKey);
    }

    async getText() {
        return await this.driver.findElement(this.selector).getText();
    }

    async getTexts() {
        return await this.driver.findElements(this.selector).map(async (elem) => {
            return await elem.getTexts();
        })
    }

    async isDisplayed() {
        return await this.driver.findElement(this.selector).isDisplayed();
    }
}

module.exports = {HtmlElement}
