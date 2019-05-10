package com.liquorexchange.db.model;

import com.liquorexchange.config.SecurityConfig;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * Holds sensitive security data that should not be exposed to anyone.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class UserSecurity {

    @Id
    private String id;

    @DBRef
    private User user;

    @NotBlank
    private String passwordHash;

    public void setPassword(String password) {
        this.setPasswordHash(SecurityConfig.passwordEncoderSingleton().encode(password));
    }

    private List<Role> roles;

    public static UserSecurity create(
        User user,
        String password,
        List<Role> roles
    ) {
        UserSecurity security = new UserSecurity();
        security.setUser(user);
        security.setPassword(password);
        security.setRoles(roles);
        return security;
    }

}