package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.User;
import com.liquorexchange.db.model.UserSecurity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

@RestResource(exported = false)
public interface UserSecurityRepository extends MongoRepository<UserSecurity, String> {

    Optional<UserSecurity> findByUser(User user);

    Boolean existsByUser(User user);

}
