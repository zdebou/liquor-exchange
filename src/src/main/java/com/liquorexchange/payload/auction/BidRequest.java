package com.liquorexchange.payload.auction;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Data
public class BidRequest {
    @NotBlank
    @Positive
    private Integer amount;
}
