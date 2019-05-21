#----------------------------------
# Example of Cucumber .feature file
#----------------------------------
    
@auction
Feature: Bid

#ukaz aktivni aukce
   @functionality
   Scenario: show active auctions
      Given user is on "homepage"
      When click on "Active auctions" in "footer"
      Then text "Auctions" is visible in "page"
      And active auctions table contains
        #| liquor_name                | country         |
         |  Chardonnay, old archive   |  Czech Republic |
         |  Sauvignon blanc from 1983 |  Czech Republic |
         |  E & J. Calvados Bushnell  |  United States  |
         |  Asbach Uralt Brandy       |  United States  |

#vytvor novou aukci
   @functionality
   Scenario: Make bid
      Given user "user@email.com" is logged in with password "password"
      And user is on "new auction"
      When fill "Name" with "Krabicak"
      And change "Auction State" to "Completed"
      And change "Product State" to "Good"
      And change "Category" to "Wine"
      And change "Country" to "Czech Republic"
      And click on "Save"
      Then active auctions table contains
         | Krabicak | Czech Republic |

#ukaze moje aukce
   @functionality
   Scenario: show my auctions
      Given user "user@email.com" is logged in with password "password"
      When click on "See my auctions" in "page"
      Then user should be on "my auctions page"
      And my auctions table contains
         | Krabicak | Czech Republic |

#smaze aukci
   @functionality
   Scenario: delete my auction
      Given user "user@email.com" is logged in with password "password"
      When click on "Active auctions" in "footer"
      And click on "Delete" in auction "Pinot noir" "Czech Republic"
      Then active auctions table doesn't contain
        #| liquor_name| country        |
         | Pinot noir | Czech Republic |
