package com.liquorexchange.db.model;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Auction {

	@Id
	private String id;

	@NotBlank(message = "Auction name cannot be empty.")
	private String name;

	@NotBlank(message = "Auction must be associated with a country.")
	private String countryCode;

	public Auction() {
	}

	public Auction(String name, Country country) {
		this.name = name;
		this.countryCode = country.getCode();
	}
}