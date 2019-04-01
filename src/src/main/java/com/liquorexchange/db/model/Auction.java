package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Document
public class Auction {

	@Id
	private String id;

	private String name;

	@DBRef
	private Country country;

	public Auction(String name, Country country) {
		this.name = name;
		this.country = country;
	}
}