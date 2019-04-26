package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuctionRepository extends MongoRepository<Auction, String> {

    @Query("{'country.code': ?0}")
    Page<Auction> findByCountryCode(@Param("code") String code, Pageable pageable);

}