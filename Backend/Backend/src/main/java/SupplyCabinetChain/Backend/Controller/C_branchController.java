package SupplyCabinetChain.Backend.Controller;


import SupplyCabinetChain.Backend.Service.C_branchService;
import SupplyCabinetChain.Backend.entity.c_branch;
import SupplyCabinetChain.Backend.entity.good;
import SupplyCabinetChain.Backend.entity.item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/c_branch")
public class C_branchController {
    private final C_branchService c_branchService;
    @Autowired
    public C_branchController(C_branchService c_branchService) {
        this.c_branchService = c_branchService;
    }

    @GetMapping(path="{c_user_id}")
    public Result getAllC_branch(@PathVariable("c_user_id") int c_user_id){
        return c_branchService.getAllC_branch(c_user_id);
    }
    @PostMapping(path="add")
    public Result addC_branch(@RequestBody c_branch c){
        return c_branchService.addC_branch(c);
    }
    @DeleteMapping
    public Result deleteC_branch(@RequestParam("c_branch_id") int C_branch_id,@RequestParam("c_user_id") int C_user_id){
        return c_branchService.deleteC_branch(C_user_id,C_branch_id);
    }
    @GetMapping
    public Result getC_branchById(@RequestParam("c_user_id") int c_user_id, @RequestParam("c_branch_id") int c_branch_id){
        return c_branchService.findC_branchById(c_user_id,c_branch_id);
    }
    @PostMapping(path="update")
    public Result updateC_branchById(@RequestBody c_branch c){
        return c_branchService.updateC_branchById(c.getC_user_id(),c.getC_branch_id(),c.getLocationx(),c.getLocationy());
    }
}
