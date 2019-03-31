package com.liquorexchange.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.liquorexchange.db.repository.*;
import com.liquorexchange.db.model.*;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final MyTestRepository test_repository;

	@Autowired
	public DatabaseLoader(MyTestRepository test_repository) {
		this.test_repository = test_repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.test_repository.save(new MyTest("Karel"));
	}
}