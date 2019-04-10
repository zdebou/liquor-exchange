package com.liquorexchange.controllers;

import com.liquorexchange.db.model.Auction;
import com.liquorexchange.db.model.AuctionView;
import com.liquorexchange.db.repository.AuctionRepository;
import com.liquorexchange.db.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<Auction> auctions;
        if (countryCode.trim().equals("")) {
            auctions = auction_repository.findAll(pageRequest);
        } else {
            auctions = auction_repository.findByCountryCode(countryCode, pageRequest);
        }
        Page<AuctionView> auctionView = new PageImpl<AuctionView>(auctions.stream().map(auction -> new AuctionView(auction, country_repository)).collect(Collectors.toList()), pageRequest, auctions.getTotalElements());
        return auctionView;
    }
}