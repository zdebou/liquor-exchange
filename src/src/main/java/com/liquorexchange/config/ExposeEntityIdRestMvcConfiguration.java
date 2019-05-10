package com.liquorexchange.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;

import com.liquorexchange.db.model.*;

@Component
public class ExposeEntityIdRestMvcConfiguration implements RepositoryRestConfigurer {

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Country.class, Auction.class, UserInfo.class, Category.class);
    }
}
