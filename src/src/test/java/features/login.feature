#----------------------------------
# Example of Cucumber .feature file
#----------------------------------

Feature: User Login
   
#uzivatel se z domovske stranky dostane na stranku, kde se muze prihlasit
   @login @functionality
   Scenario: Simple Login
      Given user is on "homepage"
      When click on "Sign In"
      Then user should be on "login page"

#uzivatel je na prihlasovaci strance a vyplni spravne email a heslo a diky tomu se korektne prihlasi
   @login @functionality
   Scenario: Accept Login
      Given user is on "login page"
      When fill "Email" with "user@email.com"
      And fill "Password" with "password"
      And click on "Submit"
      Then text "user@email.com" is visible in "top bar"
      And button "Sign In" is not visible in "top bar" 
   
#uzivatel zada spatne udaje
   @login @functionality
   Scenario: Denied Login
      Given user is on "login page"
      When fill "Email" with "user@email.com"
      And fill "Password" with "notPassword"
      And click on "Submit"
      Then button "Sign In" is visible in "top bar"
      And text "Bad credentials" is visible in "login box"
      And text "user@email.com" is not visible in "top bar"

#uzivatel se chce odhlasit
   @login @functionality
   Scenario: Sign Out
      Given user "user@email.com" is logged in with password "password"
      When click on "Sign Out"
      Then button "Sign In" is visible in "top bar"
      And text "user@email.cz" is not visible in "top bar"

#uzivatel nevyplni heslo
   @login @integrity
   Scenario: no password login
      Given user is on "login page"
      When fill "Email" with "user@email.com"
      And fill "Password" with "notPassword"
      And click on "Submit"
      Then user should be on "login page"
      And button "Sign In" is visible in "top bar"
      And text "user@email.cz" is not visible in "top bar"

#uzivatel vyplni XSS misto hesla
   @login @integrity
   Scenario: XSS login
      Given user is on "login page"
      When fill "Email" with "user@email.com"
      And fill "Password" with "<script>alert('XSS!')</script>"
      And click on "Submit"
      Then alert box is not visible

#uzivatel vyplni NoSQL injection misto jmena
   @login @integrity
   Scenario: NoSQL injection login
      Given user is on "login page"
      When fill "Email" with "db.user.remove({'_id': 'user@email.com'})"
      And fill "Password" with "password"
      And click on "Submit"
      And refresh current page
      When fill "Email" with "user@email.com"
      And fill "Password" with "password"
      And click on "Submit"
      Then text "user@email.com" is visible in "top bar"
      And button "Sign In" is not visible in "top bar" 
