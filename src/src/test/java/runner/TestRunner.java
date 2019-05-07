/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package runner;

import common.TestUtils;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.AfterClass;
import org.junit.runner.RunWith;

/**
 * Main test class for example test. This file can be run as standard Unit test
 *
 * @author divad_000
 */
@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/java/features", 
        glue = {"seleniumgluecode"}
)
public class TestRunner {
    @AfterClass
    public static void afterTests() {
        TestUtils.closeDriver();
    }
}
