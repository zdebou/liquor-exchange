package com.liquorexchange.payload.auction;

import lombok.Data;

import javax.validation.constraints.Positive;

@Data
public class BidRequest {
    @Positive
    private Integer amount;
}
