package SupplyCabinetChain.Backend.Service;


import SupplyCabinetChain.Backend.Controller.Result;
import SupplyCabinetChain.Backend.Repository.GoodRepository;
import SupplyCabinetChain.Backend.entity.good;
import SupplyCabinetChain.Backend.entity.item;
import SupplyCabinetChain.Backend.entity.user;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class goodService {
    private final GoodRepository goodRepository;
    @Autowired

    public goodService(GoodRepository goodRepository) {
        this.goodRepository = goodRepository;
    }

    public Result getAllGood(int v_user_id, int v_branch_id){
        Result result=new Result();
        result.setData(goodRepository.findGoodByVbranch(v_user_id,v_branch_id));
        result.setCode(216);
        return result;
    }
    public Result addGood(good g){
        Optional<good> goodById=goodRepository.findGoodById(g.getGood_id());
        Result result=new Result(300);
        if(goodById.isPresent()){
            result.setCode(213);
        }
        else{
            result.setCode(212);
            goodRepository.save(g);
        }
        return result;
    }
    public Result deleteGood(int id){
        Result result=new Result();
        boolean exists=goodRepository.existsById(id);
        if(exists){
            goodRepository.deleteById(id);
            result.setCode(214);

        }
        else{
            result.setCode(215);

        }
        return result;
    }
    public Result findGoodById(int id){
        boolean exists=goodRepository.existsById(id);
        if(exists) {
            good g = goodRepository.findGoodById(id).get();
            Result result=new Result(248,g);
            return result;
        }
        else{
            Result result=new Result(249);
            return result;
        }
    }
    @Transactional
    public Result updateGoodById(int id, good g){
        Result result=new Result();
        boolean exists=goodRepository.existsById(id);
        if(exists){
            good g2=goodRepository.findGoodById(id).get();
            g2.setItem_id(g.getItem_id());
            g2.setV_branch_id(g.getV_branch_id());
            g2.setV_user_id(g.getV_user_id());
            g2.setPrice(g.getPrice());
            result.setCode(218);
            result.setData(g2);
            return result;
        }
        else{
            result.setCode(219);
            return result;
        }
    }
}
