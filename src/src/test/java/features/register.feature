#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: Register

#je mozne otevrit registracni formular
   Scenario: show registration form
      Given user is on "homepage"
      When click on "Sign Up"
      Then user should be on "registration form"

#vyplni udaje a zaregistruje se
   Scenario: register successfull
      Given user is on "registration form"
      Then fill "Email" with "test.user@email.cz"
      And fill "Password" with "somePassword"
      And fill "Password again" with "somePassword"
      And click on "Sign Up"
      Then user should be on "registration successfull page"
   
