package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import com.liquorexchange.db.repository.CountryRepository;

@Data
public class AuctionView {

    @Autowired
    public AuctionView(Auction auction, CountryRepository country_repository) {
        this.auction = auction;
        this.country = country_repository.findById(this.auction.getCountryCode()).get();
    }

    private Auction auction;

    private Country country;

}
