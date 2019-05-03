package com.liquorexchange.db.repository;

import com.liquorexchange.db.model.Role;
import com.liquorexchange.db.model.RoleName;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, RoleName> {
    Optional<Role> findByName(RoleName name);
}
