/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package seleniumgluecode.common;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 *
 * @author divad_000
 */
public class TestUtils {

    public static String DRIVER_VARIABLE_NAME = "DRIVER_GECKO";
    
    public static WebDriver getDriver() {
        String driverPath = System.getenv(DRIVER_VARIABLE_NAME);
        if (driverPath == null) {
            driverPath = "geckodriver.exe";
        }
        System.setProperty("webdriver.gecko.driver", driverPath);
        return new FirefoxDriver();
    }

}
