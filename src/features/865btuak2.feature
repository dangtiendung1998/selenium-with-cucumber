Feature: Log in
Scenario: Verify that new user can Sign up and Sign in successful to the app
Given Go to https://dev-missioncontrol.vercel.app
When User click on "Sign Up" link
Then Sign up form is displayed with title "Create a new account" 
When User enter valid information in the fields: Email "testautomation@suryapasti.com", Full Name "test automation", Password "nHung@1234", Confirm password "nHung@1234"
And User click on "Sign up" button
Then Log in page is displayed
When User enter email "testautomation@suryapasti.com" and password "nHung@1234"
And User click on "Sign in" button
Then Project Overview page is displayed
