package com.liquorexchange.db.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@Document
public class Category {

    @Id
    private String id;

    @NotBlank
    private String name;

}
