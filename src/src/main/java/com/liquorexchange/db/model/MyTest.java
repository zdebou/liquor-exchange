package com.liquorexchange.db.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class MyTest {

	private @Id @GeneratedValue String id;
	private String tst;

	public MyTest(String tst) {
		this.tst = tst;
	}
}