package SupplyCabinetChain.Backend.Service;


import SupplyCabinetChain.Backend.Controller.Result;
import SupplyCabinetChain.Backend.Repository.V_branchRepository;
import SupplyCabinetChain.Backend.entity.c_branch;
import SupplyCabinetChain.Backend.entity.v_branch;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class V_branchService {
    private final V_branchRepository v_branchRepository;
    @Autowired

    public V_branchService(V_branchRepository v_branchRepository) {
        this.v_branchRepository = v_branchRepository;
    }

    public Result getAllV_branch(int id){
        Result result=new Result();
        result.setData(v_branchRepository.findAllVbranchByUserId(id));
        result.setCode(216);
        return result;
    }
    public Result getAllV_branchAll(){
        Result result=new Result();
        result.setData(v_branchRepository.findAll());
        result.setCode(216);
        return result;
    }
    public Result addV_branch( v_branch v){
        boolean empty=v_branchRepository.findAll().isEmpty();
        Optional<v_branch> v_branchById=v_branchRepository.findVbranchById(v.getV_user_id(),v.getV_branch_id());
        int count=(int)v_branchRepository.findAllVbranchByUserId(v.getV_user_id()).stream().count();
        v.setV_branch_id(count+1);
        Result result=new Result(301);
        if(v_branchById.isPresent()){
            result.setCode(213);
        }
        else{
            result.setCode(212);
            v_branchRepository.save(v);
        }
        return result;
    }
    public Result deleteV_branch(int v_user_id, int v_branch_id){
        Result result=new Result();
        boolean empty=v_branchRepository.findVbranchById(v_user_id,v_branch_id).isEmpty();
        if(!empty){
            v_branchRepository.delete(v_branchRepository.findVbranchById(v_user_id,v_branch_id).get());
            result.setCode(214);
        }
        else{
            result.setCode(215);
        }
        return result;
    }
    public Result findV_branchById(int v_user_id,int v_branch_id){
        boolean empty=v_branchRepository.findVbranchById(v_user_id,v_branch_id).isEmpty();
        if(!empty) {
            v_branch v = v_branchRepository.findVbranchById(v_user_id,v_branch_id).get();
            Result result=new Result(248,v);
            return result;
        }
        else{
            Result result=new Result(249);
            return result;
        }
    }
    @Transactional
    public Result updateV_branchById(int v_user_id,int v_branch_id, int x, int y){
        Result result=new Result();
        boolean empty=v_branchRepository.findVbranchById(v_user_id,v_branch_id).isEmpty();
        if(!empty){
            v_branch v=v_branchRepository.findVbranchById(v_user_id,v_branch_id).get();
            v.setLocationx(x);
            v.setLocationy(y);
            result.setCode(218);
            result.setData(v);
            return result;
        }
        else{
            result.setCode(219);
            return result;
        }
    }
}
