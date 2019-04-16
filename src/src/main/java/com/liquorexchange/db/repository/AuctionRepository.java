package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuctionRepository extends MongoRepository<Auction, String> {

    @Deprecated()
    Page<Auction> findByCountryCode(String code, Pageable pageable);

    Page<Auction> findAuctionsByCountry_Code(String code, Pageable pageable);

}