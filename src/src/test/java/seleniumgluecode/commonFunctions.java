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
import java.util.List;
import org.junit.After;
import static org.junit.Assert.assertTrue;
import org.junit.Ignore;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import common.SpringBootBaseIntegration;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import org.openqa.selenium.Alert;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.support.ui.Select;

/**
 *
 * @author divad_000
 */
@Ignore
public class commonFunctions extends SpringBootBaseIntegration {

    private WebDriver driver;

    public WebDriver getDriver() {
        return driver;
    }

    //driver setup
    @Before
    public void before(Scenario scenario) {
        this.driver = TestUtils.getNewDriver();
        //reset DB
        this.databaseLoader.run(new String[]{});
    }

    @After
    public void after(Scenario scenario) {
        TestUtils.closeDriver();
        this.driver = null;
    }

    //////////////Tests impl////////////////////////
    @Given("^user is on \"([^\"]*)\"$")
    public void user_is_on(String page) throws Throwable {
        this.driver.get(TestUtils.getURI(TestUtils.getPagePath(page)));
    }

    @When("^click on \"([^\"]*)\"$")
    public void click_on(String buttonText) throws Throwable {
        WebElement button = this.driver.findElement(By.xpath("//a[text()='" + buttonText + "'] | //button[text()='" + buttonText + "']"));
        button.click();
        try {
            Thread.sleep(500);
        } catch (InterruptedException ex) {

        }
    }

    @Then("^click on \"([^\"]*)\" in \"([^\"]*)\"$")
    public void click_on_in(String buttonText, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        WebElement button = place.findElement(By.xpath(".//a[text()='" + buttonText + "'] | .//button[text()='" + buttonText + "']"));
        button.click();
        try {
            Thread.sleep(500);
        } catch (InterruptedException ex) {

        }
    }

    @When("^fill \"([^\"]*)\" with \"([^\"]*)\"$")
    public void fill_with(String textfield, String text) throws Throwable {
        WebElement input = this.driver.findElement(By.xpath("//label[text()='" + textfield + "']/following-sibling::input"));
        input.sendKeys(text);
    }

    @Then("^user should be on \"([^\"]*)\"$")
    public void user_should_be_on(String page) throws Throwable {
        String pagePath = TestUtils.getPagePath(page);
        assertTrue(TestUtils.compareURIs(this.driver.getCurrentUrl(), TestUtils.getURI(pagePath)));
    }

    @Then("^text \"([^\"]*)\" is visible in \"([^\"]*)\"$")
    public void text_is_visible_in(String text, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        WebElement elem = place.findElement(By.xpath(".//*[text()='" + text + "']"));
        assertTrue(elem.isDisplayed());
    }

    @Then("^button \"([^\"]*)\" is not visible in \"([^\"]*)\"$")
    public void button_is_not_visible_in(String button, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        List<WebElement> elems = place.findElements(By.xpath(".//a[text()='" + button + "'] | .//button[text()='" + button + "']"));
        assertTrue(elems.isEmpty() || (elems.size() == 1 && elems.get(0).isDisplayed() == false));
    }

    @Then("^button \"([^\"]*)\" is visible in \"([^\"]*)\"$")
    public void button_is_visible_in(String button, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        WebElement elem = place.findElement(By.xpath(".//a[text()='" + button + "'] | .//button[text()='" + button + "']"));
        assertTrue(elem.isDisplayed());
    }

    @Then("^text \"([^\"]*)\" is not visible in \"([^\"]*)\"$")
    public void text_is_not_visible_in(String text, String placeText) throws Throwable {
        WebElement place = this.driver.findElement(By.xpath(TestUtils.getPlace(placeText)));
        List<WebElement> elems = place.findElements(By.xpath(".//*[text()='" + text + "']"));
        assertTrue(elems.isEmpty() || (elems.size() == 1 && elems.get(0).isDisplayed() == false));
    }

    @When("^change \"([^\"]*)\" to \"([^\"]*)\"$")
    public void change_to(String field, String value) throws Throwable {
        Select dropdown = new Select(this.driver.findElement(By.xpath("//label[text()='" + field + "']/following-sibling::select")));
        dropdown.selectByVisibleText(value);
    }

    @When("^refresh current page$")
    public void refresh_current_page() throws Throwable {
        this.driver.navigate().refresh();
    }

    @Then("^\"([^\"]*)\" is set to \"([^\"]*)\"$")
    public void is_set_to(String field, String value) throws Throwable {
        WebElement input = this.driver.findElement(By.xpath("//label[text()='" + field + "']/following-sibling::input"));
        assertEquals(value, input.getText());
    }

    @Then("^\"([^\"]*)\" is selected in \"([^\"]*)\"$")
    public void is_selected_in(String value, String field) throws Throwable {
        Select dropdown = new Select(this.driver.findElement(By.xpath("//label[text()='" + field + "']/following-sibling::select")));
        WebElement selected = dropdown.getFirstSelectedOption();
        assertEquals(value, selected.getText());
    }

    @Then("^alert box is not visible$")
    public void alert_box_is_not_visible() throws Throwable {
        Alert a = null;
        try {
            a = driver.switchTo().alert();
        } catch (NoAlertPresentException ex) {
            //this is ok
        }
        assertNull(a);

    }
}
