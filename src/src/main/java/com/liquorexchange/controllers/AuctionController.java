package com.liquorexchange.controllers;

import com.liquorexchange.db.model.Auction;
import com.liquorexchange.db.model.User;
import com.liquorexchange.db.repository.AuctionRepository;
import com.liquorexchange.db.repository.UserRepository;
import com.liquorexchange.exception.ResourceNotFoundException;
import com.liquorexchange.payload.ApiResponse;
import com.liquorexchange.payload.auction.BidRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/auction")
public class AuctionController {

    private AuctionRepository auctionRepository;

    private UserRepository userRepository;

    public AuctionController(AuctionRepository auctionRepository, UserRepository userRepository) {
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public Auction retrieveAuction(@PathVariable String id) {
        return getAuction(id);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/bid/{id}")
    public ResponseEntity<?> bid(Principal principal, @PathVariable String id, @Valid @RequestBody BidRequest bidRequest) {
        Auction auction = getAuction(id);
        User user = getUser(principal.getName());

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/auction/{id}")
                .buildAndExpand(auction.getId()).toUri();
        if (bidRequest.getAmount() < auction.getLastValue() + auction.getMinimumBid() && !auction.getAuctionState().equals("ACTIVE")) {
            return ResponseEntity.created(location).body(new ApiResponse(false, "Bid wasn't successful"));
        }

        auction.setLastValue(bidRequest.getAmount());
        auction.setWinner(user.getInfo());
        auctionRepository.save(auction);
        return ResponseEntity.created(location).body(new ApiResponse(true, "Bid was successful"));
    }

    private Auction getAuction(String id) {
        Optional<Auction> auction = auctionRepository.findById(id);
        if (!auction.isPresent()) {
            throw new ResourceNotFoundException("Auction", "id", id);
        }
        return auction.get();
    }

    private User getUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User", "email", email);
        }
        return user.get();
    }
}
