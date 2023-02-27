const {HtmlElement}  = require("./HtmlElement");

class Input extends HtmlElement {
    constructor(selector) {
        super(selector);
    }

    async type(str) {
        await this.driver.findElement(this.selector).sendKeys(str);
    }
}

module.exports = {
    Input
}
