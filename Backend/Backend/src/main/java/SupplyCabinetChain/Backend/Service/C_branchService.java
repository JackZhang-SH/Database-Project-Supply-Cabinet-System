package SupplyCabinetChain.Backend.Service;


import SupplyCabinetChain.Backend.Controller.Result;
import SupplyCabinetChain.Backend.Repository.C_branchRepository;
import SupplyCabinetChain.Backend.entity.c_branch;
import SupplyCabinetChain.Backend.entity.good;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class C_branchService {
    private  final C_branchRepository c_branchRepository;
    @Autowired

    public C_branchService(C_branchRepository c_branchRepository) {
        this.c_branchRepository = c_branchRepository;
    }
    public Result getAllC_branch(int id){
        Result result=new Result();
        result.setData(c_branchRepository.findAllCbranchByUserId(id));
        result.setCode(216);
        return result;
    }
    public Result addC_branch( c_branch c){
        boolean empty=c_branchRepository.findAll().isEmpty();
        Optional<c_branch> c_branchById=c_branchRepository.findCbranchById(c.getC_user_id(),c.getC_branch_id());
        int count=(int)c_branchRepository.findAllCbranchByUserId(c.getC_user_id()).stream().count();
        c.setC_branch_id(count+1);
        System.out.println(c);
        Result result=new Result(301);
        if(c_branchById.isPresent()){
            result.setCode(213);
        }
        else{
            result.setCode(212);
            c_branchRepository.save(c);
        }
        return result;
    }
    public Result deleteC_branch(int c_user_id, int c_branch_id){
        Result result=new Result();
        System.out.println("userid"+c_user_id);
        System.out.println("branchid"+c_branch_id);
        //System.out.println("did");
        boolean empty=c_branchRepository.findCbranchById(c_user_id,c_branch_id).isEmpty();
        if(!empty){
            c_branchRepository.delete(c_branchRepository.findCbranchById(c_user_id,c_branch_id).get());
            result.setCode(214);
        }
        else{
            result.setCode(215);
        }
        return result;
    }
    public Result findC_branchById(int c_user_id,int c_branch_id){
        boolean empty=c_branchRepository.findCbranchById(c_user_id,c_branch_id).isEmpty();
        if(!empty) {
            c_branch c = c_branchRepository.findCbranchById(c_user_id,c_branch_id).get();
            Result result=new Result(248,c);
            return result;
        }
        else{
            Result result=new Result(249);
            return result;
        }
    }
    @Transactional
    public Result updateC_branchById(int c_user_id,int c_branch_id, int locationx,int locationy){
        Result result=new Result();
        boolean empty=c_branchRepository.findCbranchById(c_user_id,c_branch_id).isEmpty();
        if(!empty){
            c_branch c=c_branchRepository.findCbranchById(c_user_id,c_branch_id).get();
            System.out.println(c);
            c.setLocationx(locationx);
            c.setLocationy(locationy);
            result.setCode(218);
            result.setData(c);
            return result;
        }
        else{
            result.setCode(219);
            return result;
        }
    }
}
