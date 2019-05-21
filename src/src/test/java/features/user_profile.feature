#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
Feature: User info

# ukaz info o uzivateli
   @userinfo @functionality
   Scenario: Show info
      Given user "user@email.com" is logged in with password "password"
      When click on "user@email.com" in "top bar"
      Then user is on "current user info page"
      And text "About you" is visible in "page" 

# zmena infa o uzivateli
   @userinfo @functionality
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

# zmena infa o uzivateli na prazdna pole
   @userinfo @integrity
   Scenario: Change info to empty text
      Given user "user@email.com" is logged in with password "password"
      When click on "user@email.com" in "top bar"
      And text "About you" is visible in "page" 
      And change "Type" to "Company"
      And fill "First Name" with ""
      And fill "Last Name" with ""
      And fill "Birthdate" with ""
      And fill "Address" with "Zadek u Opavy"
      And fill "Identity Card Number" with "1234567890DEF"
      And click on "Save Changes"
      Then text "Required" is visible in "page"


# zmena infa o uzivateli na XSS
   @userinfo @integrity
   Scenario: Change info to XSS
      Given user "user@email.com" is logged in with password "password"
      When click on "user@email.com" in "top bar"
      And text "About you" is visible in "page" 
      And change "Type" to "Company"
      And fill "First Name" with "<script>alert('XSS1!')</script>"
      And fill "Last Name" with "<script>alert('XSS2!')</script>"
      And fill "Address" with "<script>alert('XSS4!')</script>"
      And fill "Identity Card Number" with "<script>alert('XSS5!')</script>"
      And click on "Save Changes"
      And refresh current page
      Then alert box is not visible