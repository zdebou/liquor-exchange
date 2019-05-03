package com.liquorexchange.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.liquorexchange.db.repository.*;
import com.liquorexchange.db.model.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

/**
 * If com.liquorexchange.resetdb in application.properties is set to true,
 * all data in database will be deleted and new fresh set of test data will be created
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    private static final Country CZECH_REPUBLIC = new Country("CZ", "Czech Republic");
    private static final Country UNITED_STATES = new Country("US", "United States");

    private static final Category WINE = new Category(null, "Wine");
    private static final Category BOURBON = new Category(null, "Bourbon");

    private static final User JOHN = new User(
            "johny",
            "johny@gmail.com",
            "John",
            "Parker",
            "*****",
            "12345",
			new Calendar.Builder().setDate(1995, Calendar.MAY, 5).build().getTime(),
            "5th Avenue, 500000 NYC",
            "5th Avenue, 500000 NYC",
            "GM",
            123456,
            1234567,
			new ArrayList<Role>() {{
				add(new Role(RoleName.ADMIN));
				add(new Role(RoleName.USER));
			}}
    );

    private static final User ANNA = new User(
            "anna",
            "anna@gmail.com",
            "Anna",
            "Parker",
            "*****",
            "12345",
			new Calendar.Builder().setDate(1995, Calendar.MAY, 5).build().getTime(),
            "5th Avenue, 500000 NYC",
            "5th Avenue, 500000 NYC",
            "GM",
            123456,
            1234567,
			new ArrayList<Role>() {{
				add(new Role(RoleName.ADMIN));
				add(new Role(RoleName.USER));
			}}
    );

    @Value("${com.liquorexchange.resetdb}")
	private boolean reset_db;

	private final CountryRepository countryRepository;
	private final AuctionRepository auctionRepository;
	private final CategoryRepository categoryRepository;
	private final UserRepository userRepository;
    private final RoleRepository roleRepository;

	@Autowired
	public DatabaseLoader(
	        CountryRepository countryRepository,
            AuctionRepository auctionRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            RoleRepository roleRepository
    ) {
		this.countryRepository = countryRepository;
		this.auctionRepository = auctionRepository;
		this.categoryRepository = categoryRepository;
		this.userRepository = userRepository;
        this.roleRepository = roleRepository;
	}

	/**
	 * Find out whether database is empty of data.
	 * @return True if database is assumed empty.
	 */
	private boolean isEmpty() {
		return this.countryRepository.count() == 0;
	}

	@Override
	public void run(String... strings) {
		// DELETE EVERYTHING!
		if (this.reset_db) {
			this.countryRepository.deleteAll();
			this.auctionRepository.deleteAll();
			this.categoryRepository.deleteAll();
			this.userRepository.deleteAll();
		}

		// INSERT EVERYTHING (if db is empty)
		if (this.isEmpty()) {

			this.countryRepository.save(CZECH_REPUBLIC);
			this.countryRepository.save(UNITED_STATES);

			this.userRepository.save(JOHN);
			this.userRepository.save(ANNA);

			this.categoryRepository.save(WINE);
			this.categoryRepository.save(BOURBON);

			for (int i = 1; i <= 30; i++) {
				this.auctionRepository.save(new Auction(
					null,
					String.format("aukce %d", i),
					"ACTIVE",
					"GOOD",
					"Scratches on paper box",
					1,
					0.7,
					Date.from(Instant.now()),
					Date.from(Instant.now().plusSeconds(5 * 3600)),
					ANNA,
					JOHN,
					700,
					800,
					5,
					CZECH_REPUBLIC,
					WINE
                ));
			}
			for (int i = 1; i <= 30; i++) {
				this.auctionRepository.save(new Auction(
					null,
					String.format("test auction %d",i),
					"ACTIVE",
					"VERY GOOD",
					"As new",
					2,
					0.5,
					Date.from(Instant.now()),
					Date.from(Instant.now().plusSeconds(6 * 3600)),
					JOHN,
					ANNA,
					1000,
					1255,
					10,
					UNITED_STATES,
					BOURBON
                ));
			}

			this.roleRepository.save(new Role(RoleName.ADMIN));
			this.roleRepository.save(new Role(RoleName.USER));
		}

	}
}
