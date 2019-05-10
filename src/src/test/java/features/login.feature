#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: User Login
   
#uzivatel se z domovske stranky dostane na stranku, kde se muze prihlasit
   Scenario: Simple Login
      Given user is on "homepage"
      When click on "Sign In"
      Then user should be on "login page"

#uzivatel je na prihlasovaci strance a vyplni spravne email a heslo a diky tomu se korektne prihlasi
    Scenario: Accept Login
      Given user is on "login page"
      When fill "Email" with "user@email.cz"
      And fill "Password" with "password"
      And click on "Submit"
      Then text "user@email.cz" is visible in "top bar"
      And button "Sign In" is not visible in "top bar" 
   
      #uzivatel zada spatne udaje
    Scenario: Denied Login
      Given user is on "login page"
      When fill "Email" with "user@email.cz"
      And fill "Password" with "notPassword"
      And click on "Submit"
      Then button "Sign In" is visible in "top bar"
      And text "Log in failed." is visible in "login box"
      And text "user@email.cz" is not visible in "top bar"

#uzivatel se chce odhlasit
    Scenario: Sign Out
      Given user "user@email.cz" is logged in with password "password"
      When click on "Sign Out"
      Then button "Sign In" is visible in "top bar"
      And text "user@email.cz" is not visible in "top bar"


