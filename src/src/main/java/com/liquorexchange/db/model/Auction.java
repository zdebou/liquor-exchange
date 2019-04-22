package com.liquorexchange.db.model;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Auction {

	@Id
	private String id;

	@NotBlank(message = "Auction name cannot be empty.")
	private String name;

	@NotNull(message = "Auction must be associated with a country.")
	private Country country;

	public Auction() { }

	public Auction(String name, Country country) {
		this.name = name;
		this.country = country;
	}
}