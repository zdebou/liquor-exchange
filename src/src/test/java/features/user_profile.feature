#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@RunWith 
Feature: Change

   # zmenit info
     Scenario: Change info
      Given user "user@email.com" is logged in with password "password"
      When click on "user@email.com"
      And text "About you" is visible
      And change Type from "Individual" on "Company"
      And rewrite "Lorem" on "Prokop"
      And rewrite "Ipsum" on "Buben"
      And rewrite "1.4.2019" on "6.6.666"
      And rewrite "Lorem ipsum dolor sit amet" on "Zadek u Opavy"
      And rewrite "0123456789ABC" on "1234567890DEF"
      And click on "Save Changes"
      Then changes are apllied.