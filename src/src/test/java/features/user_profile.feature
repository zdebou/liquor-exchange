#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@userinfo 
Feature: User info

# ukaz info o uzivateli
     Scenario: Show info
      Given user "user@email.com" is logged in with password "password"
      When click on "user@email.com" in "top bar"
      Then user is on "current user info page"
      And text "About you" is visible in "page" 

# zmena infa o uzivateli
     Scenario: Change info
      Given user "user@email.com" is logged in with password "password"
      When click on "user@email.com" in "top bar"
      And text "About you" is visible in "page" 
      And change "Type" to "Company"
      And fill "First Name" with "Prokop"
      And fill "Last Name" with "Buben"
      And fill "Birthdate" with "1.1.1990"
      And fill "Address" with "Zadek u Opavy"
      And fill "Identity Card Number" with "1234567890DEF"
      And click on "Save Changes"
      And refresh current page
      And click on "user@email.com" in "top bar"
      Then user is on "current user info page"
      And "Company" is selected in "Type"
      And "First Name" is set to "Prokop"
      And "Last Name" is set to "Buben"
      And "Birthdate" is set to "1.1.1990"
      And "Address" is set to "Zadek u Opavy"
      And "Identity Card Number" is set to "1234567890DEF"