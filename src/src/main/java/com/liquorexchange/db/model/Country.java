package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Country {

	@Id
	private String code;

	private String name;

	public Country(String code, String name) {
		this.code = code;
		this.name = name;
	}
}