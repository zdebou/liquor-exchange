package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    List<User> findByUsernameIn(List<String> usernames);

    Boolean existsByUsername(String username);
}
