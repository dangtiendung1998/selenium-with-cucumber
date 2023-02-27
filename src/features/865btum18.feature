Feature: Log out
Scenario: Verify that new user can log out
Given User log in to the app with email "testautomation@suryapasti.com" and password "nHung@1234"
When User click on Log out
Then Log in page is displayed
