#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: SimpleLogin

   # A very simple scenario
   Scenario: Simple Login
      Given user on homepage
      When click on login
      Then user is on login page
   
    Scenario: Accept Login
      Given user on login page
      When use username and password
      Then user is login correct

    Scenario: Denied Login
      Given user on login page
      When use username and password
      Then user isn´t login
   