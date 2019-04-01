package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Auction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuctionRepository extends MongoRepository<Auction, String> {

}