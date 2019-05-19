#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: Bid

   Scenario: Make bid
      Given user "user@email.com" is logged in with password "password"
      When click on "Bid now!"
      And fill "Name" with "Krabičák"
      And change "Active" on "Completed"
      And change "VeryGood" on "Good"
      And change "Bourbon" on "Vine"
      And change "United States" on "Czech Republic"
      Then click on "Save"
  

   Scenario: show my auction
      Given user "user@email.com" is logged in with password "password"
      When click on "See my actions"
      And click on "Active auctions"
      Then text "Auctions" is visible
      And text "Country" is visible

   Scenario: delete my auction
      Given user "user@email.cz" is logged in with password "password"
      When click on "See my actions"
      And click on "Active auctions" 
      And click on "Delete"
      Then page doesn't contain "Krabičák"
      