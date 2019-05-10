package com.liquorexchange.payload;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.Date;

@Data
public class SignUpRequest {

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotBlank
    private String email;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String identityCardNumber;

    private Date birthDate;

    private String address;

    private String companyAddress;

    private String companyName;

    private Integer companyIdentificationNumber;

    private Integer VATNumber;
}
