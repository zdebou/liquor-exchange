package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import com.liquorexchange.db.repository.CountryRepository;

@Data
@Deprecated
public class AuctionView {

    @Autowired
    public AuctionView(Auction auction) {
        this.auction = auction;
        this.country = auction.getCountry();
    }

    private Auction auction;

    private Country country;

}
