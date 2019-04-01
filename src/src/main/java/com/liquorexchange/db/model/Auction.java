package com.liquorexchange.db.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Auction {

	@Id @GeneratedValue
	private String id;

	private String name;

	@DBRef
	@ManyToOne
	private Country country;

	public Auction(String name, Country country) {
		this.name = name;
		this.country = country;
	}
}