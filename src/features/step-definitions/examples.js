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

When('User enter valid information in the fields: Email {fakeEmail}, firstname {string}, lastname {string}, Password {string}, Confirm password {string}', async function (
    email, firstname, lastname, password, confirmPassword
) {
    await Register.enterNewAccount(email, firstname, lastname, password, confirmPassword);
})

When('User click on "Sign up" button', async function () {
    await Register.clickSubmitBtn();
})

Then('Log in page is displayed', async function () {
    await Register.verifyLoginPageDisplayed();
})

Then('User enter email {fakeEmail} and password {string}', async function(email, password) {
    await Register.enterSignIn(email, password)
})

When('User click on "Sign in" button', async function() {
    await Register.clickSubmitBtn();
})

Then('Project Overview page is displayed', async function() {
    await Register.verifyLoginSuccess()
})
