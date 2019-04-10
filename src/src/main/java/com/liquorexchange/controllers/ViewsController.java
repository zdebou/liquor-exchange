package com.liquorexchange.controllers;

import com.liquorexchange.db.model.Auction;
import com.liquorexchange.db.model.AuctionView;
import com.liquorexchange.db.repository.AuctionRepository;
import com.liquorexchange.db.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/views")
public class ViewsController {

    @Autowired
    private AuctionRepository auction_repository;

    @Autowired
    private CountryRepository country_repository;

    @GetMapping("/auctions")
    public Page<AuctionView> auctions(
            @RequestParam(value = "countryCode", required = false, defaultValue = "") String countryCode,
            @PageableDefault Pageable pageable) {
        Page<Auction> auctions;
        if (countryCode.trim().equals("")) {
            auctions = auction_repository.findAll(pageable);
        } else {
            auctions = auction_repository.findByCountryCode(countryCode, pageable);
        }
        Page<AuctionView> auctionView = new PageImpl<>(auctions.stream().map(auction -> new AuctionView(auction, country_repository)).collect(Collectors.toList()), pageable, auctions.getTotalElements());
        return auctionView;
    }
}