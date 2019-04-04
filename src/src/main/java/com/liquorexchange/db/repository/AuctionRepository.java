package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Auction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface AuctionRepository extends MongoRepository<Auction, String> {

    List<Auction> findByCountryCode(String code);

}