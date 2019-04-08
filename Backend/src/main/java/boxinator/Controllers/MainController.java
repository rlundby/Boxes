package boxinator.Controllers;

import boxinator.Repositories.BoxOrderRepository;
import boxinator.Models.BoxOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/orders")
public class MainController {
    @Autowired

    private BoxOrderRepository boxorderRepository;

    @PostMapping(path="/add")
    public BoxOrder addNewOrder (@RequestBody BoxOrder boxorder){
        double totalShipping = boxorder.getWeight() * boxorder.calculateShipping(boxorder.getCountry());
        boxorder.setShippingCost((int) totalShipping);
        boxorderRepository.save(boxorder);
        return boxorder;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<BoxOrder> getAllOrders(){
        return boxorderRepository.findAll();
    }

}
