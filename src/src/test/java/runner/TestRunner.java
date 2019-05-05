/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package runner;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;
import seleniumgluecode.common.TestUtils;

/**
 * Main test class for example test. This file can be run as standard Unit test
 * @author divad_000
 */


@RunWith(Cucumber.class)
@CucumberOptions(
features = "src/test/java/features"
,glue= {"seleniumgluecode"}
)

public class TestRunner {

    public TestRunner() {
        //check if driver environment variable is set. 
        if (System.getenv(TestUtils.DRIVER_VARIABLE_NAME) == null) {
            //If not, kill the tests
            throw new UnsupportedOperationException("Environment variable " + TestUtils.DRIVER_VARIABLE_NAME + " is not set. Please the variable to path to lacation of gecko driver.");
        }
    }
    
}
