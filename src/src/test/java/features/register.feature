#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@register
Feature: Register

#je mozne otevrit registracni formular
   Scenario: show registration form
      Given user is on "homepage"
      When click on "Sign Up"
      Then user should be on "registration form"

#vyplni udaje a zaregistruje se
   Scenario: registeration successfull
      Given user is on "registration form"
      Then fill "Email" with "test@user.cz"
      And fill "Password" with "somePassword"
      And fill "First Name" with "Test"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "login page"
      And user "test@user.cz" is able to login with password "somePassword"

#vyplni neuplne udaje a registrace neprobehne
   Scenario: incomplete registration
      Given user is on "registration form"
      Then fill "Email" with "test@user.cz"
      And fill "First Name" with "Test"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "registration form"
      And text "This is a required field." is visible in "registration box"

#vyplni údaje uzivatele ktery jiz existuje
   Scenario: duplicate registration
      Given user is on "registration form"
      Then fill "Email" with "user@email.com"
      And fill "Password" with "secondPassword"
      And fill "First Name" with "Generic"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "registration form"
      And text "Username is already taken!" is visible in "registration box"
   
