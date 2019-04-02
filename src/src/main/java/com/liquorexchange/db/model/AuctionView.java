package com.liquorexchange.db.model;

import com.liquorexchange.db.repository.CountryRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

@Data
public class AuctionView {

    @Autowired
    public AuctionView(Auction auction, CountryRepository country_repository) {
        this.auction = auction;
        this.country = country_repository.findById(this.auction.getCountry_code()).get();
    }

    private Auction auction;

    private Country country;

}
