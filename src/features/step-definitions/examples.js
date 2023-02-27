const {Given, When, Then} = require("@cucumber/cucumber");
const page = require("../page-objects/index");
const Register = new page.Register();
Given('Go to {}', async function (url) {
    await Register.goToUrl(url)
})

When('User click on "Sign Up" link', async function () {
    await Register.clickSignUpLink()
})

Then('Sign up form is displayed with title "{}"', async function (title) {
    await Register.verifyPageTitle(title)
})

When('User enter valid information in the fields: Email {string}, Full Name {string}, Password {string}, Confirm password {string}', async function (
    email, fullName, password, confirmPassword
) {
    await Register.enterNewAccount(email, fullName, password, confirmPassword);
})

When('User click on "Sign up" button', async function () {
    await Register.clickSubmitBtn();
})

Then('Log in page is displayed', async function () {
    await Register.verifyLoginPageDisplayed();
})

Then('User enter email {string} and password {string}', async function(email, password) {
    await Register.enterSignIn(email, password)
})

When('User click on "Sign in" button', async function() {
    await Register.clickSubmitBtn();
})

Then('Project Overview page is displayed', async function() {
    await Register.verifyLoginSuccess()
})
