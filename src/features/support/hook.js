const {Before, BeforeAll, BeforeStep} = require("@cucumber/cucumber");
const {After, AfterAll, AfterStep} = require("@cucumber/cucumber");
const {setDefaultTimeout, Status} = require("@cucumber/cucumber");
const {getDriver, buildDriver} = require("../../../framework/core/driverWrapper");
setDefaultTimeout(30 * 60 * 1000)
BeforeAll(async () => {
    await buildDriver();
})

AfterAll(async () => {
    return getDriver().quit()
})
