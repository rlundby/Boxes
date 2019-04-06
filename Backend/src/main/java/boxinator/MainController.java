package boxinator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/orders")
public class MainController {
    @Autowired

    private BoxorderRepository boxorderRepository;

    @PostMapping(path="/add")
    public Boxorder addNewOrder (@RequestBody Boxorder boxorder){

        boxorderRepository.save(boxorder);
        return boxorder;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Boxorder> getAllOrders(){
        return boxorderRepository.findAll();
    }

}
