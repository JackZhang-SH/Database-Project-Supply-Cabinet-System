package SupplyCabinetChain.Backend.Service;

import SupplyCabinetChain.Backend.Controller.Result;
import SupplyCabinetChain.Backend.Repository.GoodRepository;
import SupplyCabinetChain.Backend.Repository.ItemRepository;
import SupplyCabinetChain.Backend.Repository.V_branchRepository;
import SupplyCabinetChain.Backend.Repository.userRepository;
import SupplyCabinetChain.Backend.entity.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class strategyService {
    private strategy s;
    private String v_user_name;
    private v_branch v;
    private int v_user_id;
    private int totalprice=0;

    private userRepository UserRepository;
    private ItemRepository itemRepository;
    private GoodRepository goodRepository;
    private V_branchRepository v_branchRepository;
    private String priceCalculation;
    private String item_name;
    private String decision;
    private Map<Integer, combination> finalDecision;
    @Autowired
    public strategyService(int user_x, int user_y, List<Integer> item_idList, List<Integer> amount, userRepository userRepository, ItemRepository itemRepository, GoodRepository goodRepository, V_branchRepository v_branchRepository) {
        UserRepository = userRepository;
        this.itemRepository = itemRepository;
        this.goodRepository = goodRepository;
        this.v_branchRepository = v_branchRepository;
        decision=new String();
        priceCalculation=new String();
        this.s = new strategy(user_x, user_y,item_idList,amount, this.goodRepository, this.v_branchRepository);
        finalDecision=s.getLazyPopulationOfItem();
        for(int i=0;i<item_idList.size();i++){
            int price=finalDecision.get(item_idList.get(i)).getPrice();
            v=finalDecision.get(item_idList.get(i)).getV();
            v_user_id=v.getV_user_id();
            v_user_name=getUserName(v_user_id);
            item_name= this.itemRepository.findItemById(item_idList.get(i)).get().getItem_name();
            decision+="Buy "+ item_name+ " from "+v_user_name+"'s branch #"+v.getV_branch_id() +", cost= $"+price+" | ";
            if(i!=item_idList.size()-1){
                priceCalculation+=price+" + ";
            }
            else{
                priceCalculation+=price;
            }
            totalprice+=price;
        }

        priceCalculation+=", Total="+" $"+totalprice;
    }
    public String getUserName(int v_user_id){
        return UserRepository.findUserById(v_user_id).get().getUser_name();
    }

    public strategy getS() {
        return s;
    }

    public Result getPriceCalculation() {
        Result result=new Result(202,priceCalculation);
        return result;
    }

    public Result getDecision() {
        Result result=new Result(202,decision);
        return result;
    }
}
