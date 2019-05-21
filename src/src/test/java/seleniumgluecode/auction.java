/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package seleniumgluecode;

import common.SpringBootBaseIntegration;
import common.TestUtils;
import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.Map;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import org.junit.Ignore;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author divad_000
 */
@Ignore
public class auction extends SpringBootBaseIntegration {

    @When("^click on \"([^\"]*)\" in auction \"([^\"]*)\" \"([^\"]*)\"$")
    public void click_on_in_auctions(String button, String liquor, String country) throws Throwable {
        WebDriver driver = TestUtils.getDriver();
        WebElement btn = driver.findElement(By.xpath("//h1[text()='Auctions']//following-sibling::table//tbody//a[text()='" + liquor + "']//parent::td//following-sibling::td[text()='" + country + "']//following-sibling::td//button[text()='" + button + "']"));
        btn.click();
    }

    @Then("^([^\"]*) auctions table contains$")
    public void auctions_table_contains(String page, DataTable values) throws Throwable {
        WebDriver driver = TestUtils.getDriver();

        if ("active".equals(page)) {
            driver.get(TestUtils.getURI("#/auctions"));
        } else if ("my".equals(page)) {
            driver.get(TestUtils.getURI("#/my/auctions"));
        }

        WebElement table = driver.findElement(By.xpath("//h1[text()='Auctions']/following-sibling::table"));

        Map<String, String> auctions = values.asMap(String.class, String.class);

        auctions.forEach((String liquor, String country) -> {
            WebElement liquorLink = table.findElement(By.xpath(".//tbody//a[text()='" + liquor + "']"));
            WebElement countryField = liquorLink.findElement(By.xpath(".//parent::td/following::td[text()='" + country + "']"));
            assertNotNull(liquorLink);
            assertNotNull(countryField);
        });
    }

    @Then("^([^\"]*) auctions table doesn't contain$")
    public void auctions_table_doesn_t_contain(String page, DataTable values) throws Throwable {
        WebDriver driver = TestUtils.getDriver();

        if ("active".equals(page)) {
            driver.get(TestUtils.getURI("#/auctions"));
        } else if ("my".equals(page)) {
            driver.get(TestUtils.getURI("#/my/auctions"));
        }

        WebElement table = driver.findElement(By.xpath("//h1[text()='Auctions']/following-sibling::table"));

        Map<String, String> auctions = values.asMap(String.class, String.class);

        auctions.forEach((String liquor, String country) -> {
            try {
                WebElement liquorLink = table.findElement(By.xpath(".//tbody//a[text()='" + liquor + "']"));
                WebElement countryField = liquorLink.findElement(By.xpath(".//parent::td/following::td[text()='" + country + "']"));
                assertNull(liquorLink);
                assertNull(countryField);
            } catch (NoSuchElementException ex) {
                return;
            }
        });
    }

}
