package com.liquorexchange.db.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;

/**
 * Holds public user data that can be exposed to anyone.
 */
@Data
@AllArgsConstructor
@Document
public class UserInfo {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

}