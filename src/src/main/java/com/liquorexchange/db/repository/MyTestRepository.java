package com.liquorexchange.db.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.liquorexchange.db.model.MyTest;

public interface MyTestRepository extends MongoRepository<MyTest, Long> {

}