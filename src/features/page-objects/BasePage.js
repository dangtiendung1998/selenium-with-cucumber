const {Browser} = require("../../../framework/control/Browser");

class BasePage extends Browser {
    constructor(path) {
        super();
    }

    async visitTo(url) {
        await (await this.navigation()).to(url);
    }
}

module.exports = {BasePage}
