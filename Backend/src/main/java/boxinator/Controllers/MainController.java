package boxinator.Controllers;

import boxinator.Repositories.BoxorderRepository;
import boxinator.Models.Boxorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/orders")
public class MainController {
    @Autowired

    private BoxorderRepository boxorderRepository;

    @PostMapping(path="/add")
    public Boxorder addNewOrder (@RequestBody Boxorder boxorder){
        double totalShipping = boxorder.getWeight() * boxorder.calculateShipping(boxorder.getCountry());
        boxorder.setShippingCost((int) totalShipping);
        boxorderRepository.save(boxorder);
        return boxorder;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Boxorder> getAllOrders(){
        return boxorderRepository.findAll();
    }

}
