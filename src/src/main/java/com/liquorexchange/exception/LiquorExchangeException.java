package com.liquorexchange.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class LiquorExchangeException extends RuntimeException {
    public LiquorExchangeException(String message) {
        super(message);
    }

    public LiquorExchangeException(String message, Throwable cause) {
        super(message, cause);
    }
}
