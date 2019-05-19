/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package seleniumgluecode;

import common.TestUtils;
import cucumber.api.java.en.Given;
import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Ignore;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import common.SpringBootBaseIntegration;

/**
 *
 * @author divad_000
 */
@Ignore
public class login extends SpringBootBaseIntegration {

    @Given("^user \"([^\"]*)\" is logged in with password \"([^\"]*)\"$")
    public void user_is_logged_in_with_password(String user, String password) throws Throwable {
        WebDriver driver = TestUtils.getDriver();

        //go to login
        driver.get(TestUtils.getURI(TestUtils.getPagePath("login page")));

        //fill values
        WebElement input = driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));
        input.sendKeys(user);
        input = driver.findElement(By.xpath("//label[text()='Password']/following-sibling::input"));
        input.sendKeys(password);

        //click on login
        driver.findElement(By.xpath("//a[text()='Submit'] | //button[text()='Submit']")).click();

        //check if logged in
        WebElement place = driver.findElement(By.xpath(TestUtils.getPlace("top bar")));
        WebElement elem = place.findElement(By.xpath("//*[text()='" + user + "']"));
        List<WebElement> elems = place.findElements(By.xpath("//a[text()='Sign In'] | //button[text()='Sign In']"));

        assertTrue(elem.isDisplayed());
        assertTrue(elems.isEmpty() || (elems.size() == 1 && elems.get(0).isDisplayed() == false));
    }
}
