package boxinator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/orders")
public class MainController {
    @Autowired

    private BoxorderRepository boxorderRepository;

    @PostMapping(path="/add")
    public String addNewOrder (@RequestBody Boxorder boxorder){

        boxorderRepository.save(boxorder);
        return "New order has been added";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Boxorder> getAllOrders(){
        return boxorderRepository.findAll();
    }

}
