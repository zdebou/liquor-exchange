package com.liquorexchange.db.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.liquorexchange.db.model.Country;

public interface CountryRepository extends MongoRepository<Country, String> {

}