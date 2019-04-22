package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@Document
public class User {

    @Id
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String password;

    private String identityCardNumber;

    private Date birthDate;

    private String address;

    private String companyAddress;

    private String companyName;

    private Integer companyIdentificationNumber;

    private Integer VATNumber;

    public User(
            String username,
            String email,
            String firstName,
            String lastName,
            String password,
            String identityCardNumber,
            Date birthDate,
            String address,
            String companyAddress,
            String companyName,
            Integer companyIdentificationNumber,
            Integer VATNumber) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.identityCardNumber = identityCardNumber;
        this.birthDate = birthDate;
        this.address = address;
        this.companyAddress = companyAddress;
        this.companyName = companyName;
        this.companyIdentificationNumber = companyIdentificationNumber;
        this.VATNumber = VATNumber;
    }
}
