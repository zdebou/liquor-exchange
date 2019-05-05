#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: SimpleLogin

   
#uzivatel se z domovske stranky dostane na stranku, kde se muze prihlasit
   Scenario: Simple Login
      Given user on homepage
      When click on Sign in
      Then user is on login page

#uzivatel je na prihlasovaci strance a vyplni spravne email a heslo a diky tomu se korektne prihlasi
    Scenario: Accept Login
      Given user on login page
      When use Email and Password
      And Email have '@' 
      And Email have max length 20
      And Email is not null
      And Password is not null
      And Email and Password are in database
      Then user is login correct

#uzivatel zada spatne udaje
    Scenario: Denied Login
      Given user on login page
      When use Email and Password
      And use incorrect Email and Password format
      And Email aren´t in database
      And 
      Then user isn´t login
   