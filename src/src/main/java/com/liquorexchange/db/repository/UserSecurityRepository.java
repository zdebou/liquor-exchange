package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.User;
import com.liquorexchange.db.model.UserSecurity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.access.annotation.Secured;

import java.util.Optional;

public interface UserSecurityRepository extends MongoRepository<UserSecurity, String> {

    Optional<UserSecurity> findByUser(User user);

    Boolean existsByUser(User user);

}
