package boxinator;

import boxinator.Models.BoxOrder;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationTests {

    private Validator validator;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    private String getRootUrl() {
        return "http://localhost:" + port;
    }

    @Test
    public void contextLoads(){

    }

    @Test
    public void testGetAllBoxes(){
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);


        ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/orders/all",
                HttpMethod.GET, entity, String.class);

        assertNotNull(response.getBody());
    }

    @Test
    public void testAddNewBoxorder(){
        BoxOrder boxorder = new BoxOrder();
        boxorder.setReceiver("Name");
        boxorder.setColor("(255,255,255)");
        boxorder.setWeight(100);
        boxorder.setCountry("Sweden");

        double totalShipping = boxorder.getWeight() * boxorder.calculateShipping(boxorder.getCountry());
        boxorder.setShippingCost((int) totalShipping);

        ResponseEntity<BoxOrder> postResponse = restTemplate.postForEntity(getRootUrl() + "/orders/add", boxorder, BoxOrder.class);
        assertNotNull(postResponse);
        assertNotNull(postResponse.getBody());
        assertEquals(200, postResponse.getStatusCodeValue());
    }

    @Test
    public void testAddNewBoxorderNoBodyShouldGive500(){
        BoxOrder boxorder = new BoxOrder();

        ResponseEntity<BoxOrder> postResponse = restTemplate.postForEntity(getRootUrl() + "/orders/add", boxorder, BoxOrder.class);
        assertEquals(500, postResponse.getStatusCodeValue());
    }

    @Before
    public void setUp(){
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void testInvalidFieldsShouldFailValidation(){
        BoxOrder boxorder = new BoxOrder();
        boxorder.setReceiver("");
        boxorder.setColor("");
        boxorder.setWeight(-1);
        boxorder.setCountry("");
        Set<ConstraintViolation<BoxOrder>> violations = validator.validate(boxorder);

        assertFalse(violations.isEmpty());

    }
}
