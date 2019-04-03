package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Data
@Document
public class Country {

	@Id
	private String code;

	@NotBlank(message = "Country name cannot be empty.")
	private String name;

	public Country(String code, String name) {
		this.code = code;
		this.name = name;
	}
}