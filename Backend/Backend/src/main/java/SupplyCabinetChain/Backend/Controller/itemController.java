package SupplyCabinetChain.Backend.Controller;


import SupplyCabinetChain.Backend.Service.itemService;
import SupplyCabinetChain.Backend.entity.item;
import SupplyCabinetChain.Backend.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/item")
public class itemController {
    private final itemService iService;
    @Autowired
    public itemController(itemService iService) {
        this.iService = iService;
    }
    @GetMapping
    public Result getAllItem(){
        return iService.getAllItem();
    }
    @PostMapping
    public Result addItem(@RequestBody item i){
        return iService.addItem(i);
    }
    @DeleteMapping
    public Result deleteItem(@RequestParam("item_id") int id){
        return iService.deleteItem(id);
    }
    @GetMapping(path="{item_id}")
    public Result getItemById(@PathVariable("item_id") int id){
        return iService.findItemById(id);
    }
}
