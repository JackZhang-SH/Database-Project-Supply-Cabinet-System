package SupplyCabinetChain.Backend.Controller;

import SupplyCabinetChain.Backend.Repository.GoodRepository;
import SupplyCabinetChain.Backend.Repository.ItemRepository;
import SupplyCabinetChain.Backend.Repository.V_branchRepository;
import SupplyCabinetChain.Backend.Repository.userRepository;
import SupplyCabinetChain.Backend.Service.strategyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

class input{
    public int user_x;
    public int user_y;
    public List<Integer> item_idList;
    public List<Integer> amount;
}
@RestController
@RequestMapping(path="/map")
public class MapController {
    private List<Map<Integer, Integer>> id_amount;
    private userRepository UserRepository;
    private ItemRepository itemRepository;
    private GoodRepository goodRepository;
    private V_branchRepository v_branchRepository;
    @Autowired
    public MapController(userRepository userRepository, ItemRepository itemRepository, GoodRepository goodRepository, V_branchRepository v_branchRepository) {
        UserRepository = userRepository;
        this.itemRepository = itemRepository;
        this.goodRepository = goodRepository;
        this.v_branchRepository = v_branchRepository;
    }

    @PostMapping(path = "/price")
    @CrossOrigin
    public Result getPrice(@RequestBody input i ){
        strategyService strategyservice=new strategyService(i.user_x,i.user_y,i.item_idList,i.amount, UserRepository, itemRepository, goodRepository, v_branchRepository);
        return strategyservice.getPriceCalculation();
    }
    @PostMapping(path = "/strategy")
    @CrossOrigin
    public Result getStrategy(@RequestBody input i){
        strategyService strategyservice=new strategyService(i.user_x,i.user_y,i.item_idList,i.amount, UserRepository, itemRepository, goodRepository, v_branchRepository);
        return strategyservice.getDecision();
    }
}
