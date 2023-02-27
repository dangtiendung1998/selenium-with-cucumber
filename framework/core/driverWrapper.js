'use strict';

require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const webDriver = require("selenium-webdriver");
// chromeOptions.addArguments('--disable-gpu')
// chromeOptions.addArguments('--disable-dev-shm-usage')
// chromeOptions.addArguments('--no-sandbox')

// config
const SCRIPT_TIMEOUT = 60 * 1000; //
const PAGE_TIMEOUT = 60 * 1000;
const IMPLICIT_TIMEOUT = 60 * 1000; // Chờ ngầm định

let driver;

const buildDriver = async () => {
  if (typeof driver === 'undefined') {
    let chromeOptions = new chrome.Options()
    chromeOptions.excludeSwitches("enable-logging")
    chromeOptions.addArguments('--ignore-certificate-errors')
    chromeOptions.addArguments('--lang=en')
    chromeOptions.addArguments('start-maximized')
    chromeOptions.addArguments('disable-extensions')
    driver = await new webDriver.Builder().forBrowser('chrome').setChromeOptions(chromeOptions).setCapability("acceptInsecureCerts", true).build()
    await driver.manage().window().maximize()
    await driver.manage().setTimeouts({implicit: IMPLICIT_TIMEOUT, page: PAGE_TIMEOUT, script: SCRIPT_TIMEOUT})
  }
}

const getDriver = () => {
  return driver;
}

module.exports = {
  getDriver,
  buildDriver,
}
