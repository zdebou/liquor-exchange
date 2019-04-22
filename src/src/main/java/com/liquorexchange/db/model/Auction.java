package com.liquorexchange.db.model;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@Data
@Document
public class Auction {

	@Id
	private String id = UUID.randomUUID().toString();

	@NotBlank(message = "Auction name cannot be empty.")
	private String name;

	@NotBlank(message = "ACTIVE | COMPLETED")
	private String auctionState;

	@NotBlank(message = "GOOD | VERY GOOD | ???")
	private String productState;

	private String description;

	private Integer quantity;

	private Double volume;

	private Date start;

	private Date end;

	private User seller;

	private User winner;

	private Integer initialValue;

	/** The value of the highest bid offered.*/
	private Integer lastValue;

	/** The minimum value by which one bid has to be higher than the previous one.*/
	private Integer minimumBid;

	@NotNull(message = "Auction must be associated with a country.")
	private Country country;

	@NotNull(message = "Auction must be associated with a category.")
	private Category category;

	public Auction() { }

	public Auction(
			String name,
			String auctionState,
			String productState,
			String description,
			Integer quantity,
			Double volume,
			Date start,
			Date end,
			User seller,
			User winner,
			Integer initialValue,
			Integer lastValue,
			Integer minimumBid,
			Country country,
			Category category) {
		this.name = name;
		this.auctionState = auctionState;
		this.productState = productState;
		this.description = description;
		this.quantity = quantity;
		this.volume = volume;
		this.start = start;
		this.end = end;
		this.seller = seller;
		this.winner = winner;
		this.initialValue = initialValue;
		this.lastValue = lastValue;
		this.minimumBid = minimumBid;
		this.country = country;
		this.category = category;
	}

	public Auction(String name, Country country) {
		this.name = name;
		this.country = country;
	}
}