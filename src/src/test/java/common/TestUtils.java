/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package common;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 *
 * @author divad_000
 */
public class TestUtils {

    //Pages list
    public static final Map<String, String> pages;

    //places list
    public static final Map<String, String> places;

    static {
        //create pages list
        Map<String, String> tmpPages = new HashMap<>();
        tmpPages.put("homepage", "#/");
        tmpPages.put("login page", "#/login/");
        tmpPages.put("registration form", "#/signup/");
        pages = Collections.unmodifiableMap(tmpPages);

        //create places list
        Map<String, String> tmpPlaces = new HashMap<>();
        tmpPlaces.put("top bar", "//nav[contains(concat(' ',normalize-space(@class),' '),' navbar')]");
        tmpPlaces.put("login box", "//h2[text()='Sign In']/parent::div[@class='card-body']");
        places = Collections.unmodifiableMap(tmpPlaces);
    }

    public static String getPagePath(String page) {
        if (pages.containsKey(page)) {
            return pages.get(page);
        } else {
            return page;
        }
    }

    public static String getPlace(String place) {
        if (places.containsKey(place)) {
            return places.get(place);
        } else {
            return place;
        }
    }

    ///////////////Driver management
    private static String DRIVER_VARIABLE_NAME = "DRIVER_GECKO";
    private static WebDriver currentDriver = null;
//

    public static WebDriver getDriver() {
        if (currentDriver == null) {
            return getNewDriver();
        } else {
            return currentDriver;
        }
    }

    public static WebDriver getNewDriver() {
        closeDriver();
        String driverPath = System.getenv(DRIVER_VARIABLE_NAME);
        if (driverPath == null) {
            driverPath = "geckodriver.exe";
        }
        System.setProperty("webdriver.gecko.driver", driverPath);
        currentDriver = new FirefoxDriver();
        currentDriver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        return currentDriver;
    }

    public static void closeDriver() {
        if (currentDriver != null) {
            currentDriver.quit();
            currentDriver = null;
        }
    }

    //////////////////////End of driver management
    public static String getURI(String server, String path) {
//        String server = this.
        StringBuilder b = new StringBuilder();
        if (!(server.startsWith("http://") || server.startsWith("https://"))) {
            b.append("http://");
        }
        b.append(server);
        if (!server.endsWith("/")) {
            b.append("/");
        }
        if (path.startsWith("/")) {
            b.append(path.substring(1));
        } else {
            b.append(path);
        }

        return b.toString();
    }

    public static String getURI(String path) {
        return getURI("http://localhost:8080/", path);
    }

    public static boolean compareURIs(String URI1, String URI2) {
        if (URI1.endsWith("/") == false) {
            URI1 = URI1 + "/";
        }
        if (URI2.endsWith("/") == false) {
            URI2 = URI2 + "/";
        }

        return URI1.equals(URI2);
    }

}
