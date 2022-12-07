package SupplyCabinetChain.Backend.Controller;


import SupplyCabinetChain.Backend.Service.C_branchService;
import SupplyCabinetChain.Backend.Service.V_branchService;
import SupplyCabinetChain.Backend.entity.c_branch;
import SupplyCabinetChain.Backend.entity.v_branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/v_branch")
public class V_branchController {
    private final V_branchService v_branchService;
    @Autowired
    public V_branchController(V_branchService v_branchService) {
        this.v_branchService = v_branchService;
    }

    @GetMapping(path="{v_user_id}")
    public Result getAllV_branch(@PathVariable("v_user_id") int v_user_id){
        return v_branchService.getAllV_branch(v_user_id);
    }
    @PostMapping(path="add")
    public Result addV_branch(@RequestBody v_branch v){
        return v_branchService.addV_branch(v);
    }
    @DeleteMapping
    public Result deleteV_branch(@RequestParam("v_branch_id") int V_branch_id,@RequestParam("v_user_id") int V_user_id){
        return v_branchService.deleteV_branch(V_user_id,V_branch_id);
    }
    @GetMapping
    public Result getV_branchById(@RequestParam("v_user_id") int v_user_id, @RequestParam("v_branch_id") int v_branch_id){
        return v_branchService.findV_branchById(v_user_id,v_branch_id);
    }
    @PostMapping(path="update")
    public Result updateV_branchById(@RequestBody v_branch v){
        return v_branchService.updateV_branchById(v.getV_user_id(),v.getV_branch_id(),v.getLocationx(),v.getLocationy());
    }

}
