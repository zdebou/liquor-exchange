package com.liquorexchange.db.model;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Country {

	@Id
	private String id;

	private String name;

	public Country(String code, String name) {
		this.id = code;
		this.name = name;
	}
}