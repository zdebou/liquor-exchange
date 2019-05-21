#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@register
Feature: Register

#je mozne otevrit registracni formular
   @functionality
   Scenario: show registration form
      Given user is on "homepage"
      When click on "Sign Up"
      Then user should be on "registration form"

#vyplni udaje a zaregistruje se
   @functionality
   Scenario: registeration successfull
      Given user is on "registration form"
      When fill "Email" with "test@user.cz"
      And fill "Password" with "somePassword"
      And fill "First Name" with "Test"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "login page"
      And user "test@user.cz" is able to login with password "somePassword"

#vyplni údaje uzivatele ktery jiz existuje
   @functionality
   Scenario: duplicate registration
      Given user is on "registration form"
      When fill "Email" with "user@email.com"
      And fill "Password" with "secondPassword"
      And fill "First Name" with "Generic"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "registration form"
      And text "Username is already taken!" is visible in "registration box"
   
#vyplni neuplne udaje a registrace neprobehne
   @integrity
   Scenario: incomplete registration
      Given user is on "registration form"
      When fill "Email" with "test@user.cz"
      And fill "First Name" with "Test"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "registration form"
      And text "This is a required field." is visible in "registration box"

#vyplni email ve spatnem formatu a registrace neprobehne
   @integrity
   Scenario: wrong email format registration
      Given user is on "registration form"
      When fill "Email" with "test123user.cz"
      And fill "Password" with "secondPassword"
      And fill "First Name" with "Test"
      And fill "Last Name" with "User"
      And click on "Sign Up" in "registration box"
      Then user should be on "registration form"
      And text "Please provide a valid email address." is visible in "registration box"

#vyplni jmeno jako script tag
   @integrity
   Scenario: XSS name registration
      Given user is on "registration form"
      When fill "Email" with "test2@user.cz"
      And fill "Password" with "secondPassword"
      And fill "First Name" with "<script>alert('XSS!')</script>"
      And fill "Last Name" with "XSS"
      And click on "Sign Up" in "registration box"
      And fill "Email" with "test2@user.cz"
      And fill "Password" with "secondPassword"
      And click on "Submit"
      And click on "test2@user.cz" in "top bar"
      Then alert box is not visible

#vyplni jmeno jako mongoDB injection
   @integrity
   Scenario: NoSQL injection registration
      Given user is on "registration form"
      When fill "Email" with "test2@user.cz"
      And fill "Password" with "secondPassword"
      And fill "First Name" with "db.user.remove({'_id': 'user@email.com'})"
      And fill "Last Name" with "NoSQL injection"
      And click on "Sign Up" in "registration box"
      And fill "Email" with "user@email.com"
      And fill "Password" with "password"
      And click on "Submit"
      Then text "user@email.com" is visible in "top bar"
