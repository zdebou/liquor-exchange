package com.liquorexchange.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.liquorexchange.db.repository.*;
import com.liquorexchange.db.model.*;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final CountryRepository country_repository;
	private final AuctionRepository auction_repository;

	@Autowired
	public DatabaseLoader(CountryRepository country_repository, AuctionRepository auction_repository) {
		this.country_repository = country_repository;
		this.auction_repository = auction_repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		Country czech_rep = new Country("CZ", "Czech Republic");
		this.country_repository.save(czech_rep);
		this.country_repository.save(new Country("US", "United States"));

		this.auction_repository.save(new Auction("test auction 1", czech_rep));
		this.auction_repository.save(new Auction("test auction 2", czech_rep));

	}
}