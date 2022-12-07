package SupplyCabinetChain.Backend.Service;


import SupplyCabinetChain.Backend.Controller.Result;
import SupplyCabinetChain.Backend.Repository.ItemRepository;
import SupplyCabinetChain.Backend.entity.item;
import SupplyCabinetChain.Backend.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.event.ItemEvent;
import java.util.Optional;

@Service
public class itemService {
    private final ItemRepository itemRepository;
    @Autowired
    public itemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Result getAllItem(){
        Result result=new Result();
        result.setData(itemRepository.findAll());
        result.setCode(206);
        return result;
    }
    public Result addItem(item i){
        Optional<item> itemById=itemRepository.findItemById(i.getItem_id());
        Result result=new Result(300);
        if(itemById.isPresent()){
            result.setCode(209);
        }
        else{
            result.setCode(208);
            itemRepository.save(i);
        }
        return result;
    }
    public Result deleteItem(int id){
        Result result=new Result();
        boolean exists=itemRepository.existsById(id);
        if(exists){
            itemRepository.deleteById(id);
            result.setCode(210);

        }
        else{
            result.setCode(211);

        }
        return result;
    }
    public Result findItemById(int id){
        boolean exists=itemRepository.existsById(id);
        if(exists) {
            item i = itemRepository.findItemById(id).get();
            Result result=new Result(246,i);
            return result;
        }
        else{
            Result result=new Result(247);
            return result;
        }
    }
}
