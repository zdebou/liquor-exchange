#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: Register
   
   Scenario: correct register
      Given user on home page
      When user click on Registration
      Then user is on registration form
      And fill Email box
      And fill Password box
      And repeat Password in next box
   
