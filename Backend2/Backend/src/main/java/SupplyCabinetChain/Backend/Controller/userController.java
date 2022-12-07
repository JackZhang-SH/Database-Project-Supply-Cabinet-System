package SupplyCabinetChain.Backend.Controller;


import SupplyCabinetChain.Backend.Service.userService;
import SupplyCabinetChain.Backend.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/user")
public class userController {
    private final userService uService;
    @Autowired
    public userController(userService uService) {
        this.uService = uService;
    }

    @GetMapping
    public List<user> getUser(user User){
        return uService.getUser(User);
    }
    @PostMapping
    public Result addUser(@RequestBody user User){
        return uService.insertUser(User);
    }
    @PostMapping(path = "checkin")
    public Result checkin(@RequestParam("user_id") int id, @RequestParam("user_password") String password){
        return uService.checkin(id,password);
    }
    @GetMapping(path="{user_id}")
    public Result getUserById(@PathVariable("user_id") int id){
        return uService.getUserById(id);
    }
    @PostMapping (path="/updatePassword")
    public String updatePassword(@RequestParam("user_id") int id, @RequestParam("user_password") String password){
        return uService.updatePassword(id,password);
    }
}
