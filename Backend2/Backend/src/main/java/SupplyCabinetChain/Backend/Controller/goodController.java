package SupplyCabinetChain.Backend.Controller;


import SupplyCabinetChain.Backend.Service.goodService;
import SupplyCabinetChain.Backend.entity.good;
import SupplyCabinetChain.Backend.entity.item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/good")
public class goodController {
    private final goodService gService;
    @Autowired
    public goodController(goodService gService) {
        this.gService = gService;
    }

    @GetMapping
    //One v_branch's good
    public Result getAllGood(@RequestParam("v_user_id") int v_user_id,@RequestParam("v_branch_id") int v_branch_id ){
        return gService.getAllGood(v_user_id,v_branch_id);
    }
    //The http request's json string should be all lower case
    @PostMapping
    public Result addGood(@RequestBody good g){
        System.out.println(g);
        return gService.addGood(g);
    }
    @DeleteMapping
    public Result deleteGood(@RequestParam("good_id") int id){
        return gService.deleteGood(id);
    }
    @GetMapping(path="{good_id}")
    public Result getGoodById(@PathVariable("good_id") int id){
        return gService.findGoodById(id);
    }
    @PostMapping(path="{good_id}")
    public Result updateGoodById(@PathVariable("good_id") int id, @RequestBody good g){
        return gService.updateGoodById(id,g);
    }
}
