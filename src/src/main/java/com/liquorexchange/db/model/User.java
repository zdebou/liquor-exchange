package com.liquorexchange.db.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@AllArgsConstructor
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

}
