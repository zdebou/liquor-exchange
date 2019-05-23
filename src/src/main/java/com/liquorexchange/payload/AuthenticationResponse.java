package com.liquorexchange.payload;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private final String accessToken;
    private final String displayName;

}
