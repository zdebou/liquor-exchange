package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AuctionRepository extends MongoRepository<Auction, String> {

    Page<Auction> findByCountryCode(String code, Pageable pageable);

}