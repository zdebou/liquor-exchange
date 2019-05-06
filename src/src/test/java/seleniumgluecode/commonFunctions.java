/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package seleniumgluecode;

import common.TestUtils;
import cucumber.api.Scenario;
import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.net.URL;
import org.junit.After;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author divad_000
 */
public class commonFunctions {

    private WebDriver driver;

    public WebDriver getDriver() {
        return driver;
    }

    //driver setup
    @Before
    public void before(Scenario scenario) {
        this.driver = TestUtils.getNewDriver();
    }
    
    @After
    public void after(Scenario scenario) {
        TestUtils.closeDriver();
        this.driver = null;
    }

    //////////////Tests impl////////////////////////
    @Given("^user is on \"([^\"]*)\"$")
    public void user_is_on(String page) throws Throwable {
        this.driver.get(TestUtils.getURL(TestUtils.getPagePath(page)));
    }

    @When("^click on \"([^\"]*)\"$")
    public void click_on(String buttonText) throws Throwable {
        WebElement button = this.driver.findElement(By.xpath("//a[text()='" + buttonText + "'] | //button[text()='" + buttonText + "']"));
        assertNotNull(button);
        button.click();
    }

    @When("^fill \"([^\"]*)\" with \"([^\"]*)\"$")
    public void fill_with(String textfield, String text) throws Throwable {
        WebElement input = this.driver.findElement(By.xpath("//label[text()='" + textfield + "']/following-sibling::input"));
        input.sendKeys(text);
    }

    @Then("^user should be on \"([^\"]*)\"$")
    public void user_should_be_on(String page) throws Throwable {
        URL currentUrl = new URL(this.driver.getCurrentUrl());
        URL shouldBeUrl = new URL(TestUtils.getURL(page));

        assertTrue(currentUrl.equals(shouldBeUrl));
    }

    @Then("^text \"([^\"]*)\" is visible in \"([^\"]*)\"$")
    public void text_is_visible_in(String text, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        assertNotNull(place);
        WebElement elem = place.findElement(By.xpath("//*[text()='" + text + "']"));
        assertNotNull(elem);
        assertTrue(elem.isDisplayed());
    }

    @Then("^button \"([^\"]*)\" is not visible in \"([^\"]*)\"$")
    public void button_is_not_visible_in(String button, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        assertNotNull(place);
        WebElement elem = place.findElement(By.xpath("//a[text()='" + button + "'] | //button[text()='" + button + "']"));
        assertTrue(elem == null || elem.isDisplayed() == false);
    }

    @Then("^button \"([^\"]*)\" is visible in \"([^\"]*)\"$")
    public void button_is_visible_in(String button, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        assertNotNull(place);
        WebElement elem = place.findElement(By.xpath("//a[text()='" + button + "'] | //button[text()='" + button + "']"));
        assertNotNull(elem);
        assertTrue(elem.isDisplayed());
    }

    @Then("^text \"([^\"]*)\" is not visible in \"([^\"]*)\"$")
    public void text_is_not_visible_in(String text, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        assertNotNull(place);
        WebElement elem = place.findElement(By.xpath("//*[text()='" + text + "']"));
        assertTrue(elem == null || elem.isDisplayed() == false);
    }
}
