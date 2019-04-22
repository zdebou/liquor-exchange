package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> { }
