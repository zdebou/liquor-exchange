/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package seleniumgluecode;

import common.SpringBootBaseIntegration;
import cucumber.api.PendingException;
import cucumber.api.java.en.Then;
import org.junit.Ignore;

/**
 *
 * @author divad_000
 */
@Ignore
public class registration extends SpringBootBaseIntegration{

    @Then("^user \"([^\"]*)\" is able to login with password \"([^\"]*)\"$")
    public void user_is_able_to_login_with_password(String arg1, String arg2) throws Throwable {
        
    }
}
