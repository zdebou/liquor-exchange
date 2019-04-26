package com.liquorexchange.db.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import javax.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document
public class Country {

	@Id
	private String code;

	@NotBlank(message = "Country name cannot be empty.")
	private String name;

}