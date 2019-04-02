package com.liquorexchange.db.model;

import com.liquorexchange.db.repository.CountryRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Document
public class Auction {

	@Id
	private String id;

	private String name;

	private String country_code;

	public Auction() {
	}

	public Auction(String name, Country country) {
		this.name = name;
		this.country_code = country.getCode();
	}
}