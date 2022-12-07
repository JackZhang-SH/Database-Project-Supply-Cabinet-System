package SupplyCabinetChain.Backend.Service;


import SupplyCabinetChain.Backend.Controller.Result;
import SupplyCabinetChain.Backend.Repository.userRepository;
import SupplyCabinetChain.Backend.entity.user;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class userService {

    private final userRepository uRepository;
    @Autowired
    public userService(userRepository uRepository) {
        this.uRepository = uRepository;
    }

    public List<user> getUser(user u){
        return uRepository.findAll();
    }
    public Result insertUser(user u){
        Optional<user> userById=uRepository.findUserById(u.getUser_id());
        Result result=new Result(300);
        if(userById.isPresent()){
            result.setCode(203);
        }
        else{
            result.setCode(202);
            uRepository.save(u);
        }
        return result;
    }
    public String deleteUser(int id){
        boolean exists=uRepository.existsById(id);
        if(exists){
            uRepository.deleteById(id);
            return "202";
        }
        else{
            return "203";
        }
    }
    @Transactional
    public String updatePassword(int id, String password){
        boolean exists=uRepository.existsById(id);
        if(exists){
            user u=uRepository.findUserById(id).get();
            u.setUser_password(password);
            return "204";
        }
        else{
            return "208";
        }
    }

    public Result getUserById(int id){
        boolean exists=uRepository.existsById(id);
        if(exists) {
            user u = uRepository.findUserById(id).get();
            Result result=new Result(200,u);
            return result;
        }
        else{
            Result result=new Result(201);
            return result;
        }
    }

    public Result checkin(int id, String password){
        Result result=new Result();
        boolean exists=uRepository.existsById(id);
        if(exists){
            user u = uRepository.findUserById(id).get();
            if(u.getUser_password().equals(password)){
                result.setCode(204);  //password match
            }
        }
        else{
            result.setCode(205);
        }
        return result;
    }
}
//Result result=new Result();
//return result;