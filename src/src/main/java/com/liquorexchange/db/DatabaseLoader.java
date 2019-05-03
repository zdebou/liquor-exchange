package com.liquorexchange.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.liquorexchange.db.repository.*;
import com.liquorexchange.db.model.*;

/**
 * If com.liquorexchange.resetdb in application.properties is set to true,
 * all data in database will be deleted and new fresh set of test data will be created
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	@Value("${com.liquorexchange.resetdb}")
	private boolean reset_db;

	private final CountryRepository country_repository;
	private final AuctionRepository auction_repository;
	private final RoleRepository roleRepository;

	@Autowired
	public DatabaseLoader(CountryRepository country_repository, AuctionRepository auction_repository, RoleRepository roleRepository) {
		this.country_repository = country_repository;
		this.auction_repository = auction_repository;
		this.roleRepository = roleRepository;
	}

	/**
	 * Find out whether database is empty of data.
	 * @return True if database is assumed empty.
	 */
	private boolean isEmpty() {
		return this.country_repository.count() == 0 && this.roleRepository.count() == 0;
	}

	@Override
	public void run(String... strings) throws Exception {
		// DELETE EVERYTHING!
		if (this.reset_db) {
			this.country_repository.deleteAll();
			this.auction_repository.deleteAll();
			this.roleRepository.deleteAll();
		}

		// INSERT EVERYTHING (if db is empty)
		if (this.isEmpty()) {
			Country czech_rep = new Country("CZ", "Czech Republic");
			this.country_repository.save(czech_rep);

			Country usa = new Country("US", "United States");
			this.country_repository.save(usa);

			for (int i = 1; i <= 30; i++) {
				this.auction_repository.save(new Auction(String.format("aukce %d", i), czech_rep));
			}
			for (int i = 1; i <= 30; i++) {
				this.auction_repository.save(new Auction(String.format("test auction %d",i), usa));
			}

			this.roleRepository.save(new Role(RoleName.ADMIN));
			this.roleRepository.save(new Role(RoleName.USER));
		}
	}
}
