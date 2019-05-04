package com.liquorexchange.db.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@Document
public class Auction {

	@Id
	private String id;

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

}