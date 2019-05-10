package com.liquorexchange.db.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Holds private user data that should not be exposed to anonymous users.
 */
@Data
@AllArgsConstructor
@Document
public class User {

    @Id
    private String email;

    @NotNull
    private UserInfo info;

    private String identityCardNumber;

    private Date birthDate;

    private String address;

    private String companyAddress;

    private String companyName;

    private Integer companyIdentificationNumber;

    private Integer VATNumber;

}