/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package runner;

import com.liquorexchange.LiquorExchangeApplication;
import com.liquorexchange.db.DatabaseLoader;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author divad_000
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class SpringBootBaseIntegration {

    @LocalServerPort
    protected int port;

    @Autowired
    DatabaseLoader dl;

    private static boolean appStarted = false;

    public SpringBootBaseIntegration() {
        if (appStarted == false) {
            SpringApplication.run(LiquorExchangeApplication.class, new String[]{});
            appStarted = true;
        }
    }
}
