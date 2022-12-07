package SupplyCabinetChain.Backend.entity;


import SupplyCabinetChain.Backend.Repository.GoodRepository;
import SupplyCabinetChain.Backend.Repository.V_branchRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class strategy {
    //The list of each item's price in every v_branch
    //Map<item_id,TreeMap<v_branch,price>>
    private Map<Integer,combination> lazyPopulationOfItem;

    private GoodRepository goodRepository;

    private V_branchRepository v_branchRepository;
    private boolean exists=false;
    private double ratio=0.08;
    @Autowired
    public strategy(int user_x, int user_y, List<Integer> item_idList, List<Integer> amount, GoodRepository goodRepository, V_branchRepository v_branchRepository){
        this.goodRepository = goodRepository;
        this.v_branchRepository = v_branchRepository;
        lazyPopulationOfItem=new HashMap<Integer,combination>();
        lazyPopulationOfItem=lazyPopulation(user_x,user_y,item_idList,amount);

    }

    public strategy(){
        lazyPopulationOfItem=new HashMap<Integer,combination>();
    }
    public Map<Integer,combination> getLazyPopulationOfItem() {
        return lazyPopulationOfItem;
    }

    public void setLazyPopulationOfItem(int user_x, int user_y,List<Integer> item_idList,List<Integer> amount) {
        this.lazyPopulationOfItem = lazyPopulation(user_x,user_y,item_idList,amount);
    }
//    public static <K, V extends Comparable<V> > Map<K, V>
//    valueSort(final Map<K, V> map)
//    {
//        // Static Method with return type Map and
//        // extending comparator class which compares values
//        // associated with two keys
//        Comparator<K> valueComparator = new Comparator<K>() {
//
//            // return comparison results of values of
//            // two keys
//            public int compare(K k1, K k2)
//            {
//                int comp = map.get(k1).compareTo(
//                        map.get(k2));
//                if (comp == 0)
//                    return 1;
//                else
//                    return comp;
//            }
//
//        };
//
//        // SortedMap created using the comparator
//        Map<K, V> sorted = new TreeMap<K, V>(valueComparator);
//
//        sorted.putAll(map);
//
//        return sorted;
//    }
static <K,V extends Comparable<? super V>>
SortedSet<Map.Entry<K,V>> entriesSortedByValues(Map<K,V> map) {
    SortedSet<Map.Entry<K,V>> sortedEntries = new TreeSet<Map.Entry<K,V>>(
            new Comparator<Map.Entry<K,V>>() {
                @Override public int compare(Map.Entry<K,V> e1, Map.Entry<K,V> e2) {
                    int res = e1.getValue().compareTo(e2.getValue());
                    return res != 0 ? res : 1;
                }
            }
    );
    sortedEntries.addAll(map.entrySet());
    return sortedEntries;
}
    public Map<Integer,combination> lazyPopulation(int user_x, int user_y,List<Integer> item_idList,List<Integer> amount){
        Map<Integer,combination> item_map=new HashMap<Integer,combination>();
        List<v_branch> v_branchList=v_branchRepository.findAll();
        TreeMap<Integer,Integer> vbranch_price=new TreeMap<Integer,Integer>();
        //store each v_branch's goods
        List<good> goodList=new ArrayList<good>();
//        System.out.println(goodList);
        //the v_branch that we are looking now
        v_branch v=new v_branch();
        int item_id=-1;
        int price=0;
        int delivery=0;
        int total=0;
        int x=0;
        int y=0;
        //to each item
        for(int i=0;i<item_idList.size();i++){
            vbranch_price.clear();
            item_id=item_idList.get(i);
            //reset goodList and exists
            goodList.clear();
            exists=false;

            // for each v_branch
            for(int j=0;j<v_branchList.size();j++){
                   v=v_branchList.get(j);
                   x=v.getLocationx();
                   y=v.getLocationy();
                   goodList=goodRepository.findAll();
//                   System.out.println(goodList);
//                   System.out.println(v);
                   //the branch's goods
                   for(int k=0;k<goodList.size();k++){
                       //if the branch has this good
                       if(item_id==goodList.get(k).getItem_id()){
                           exists=true;
                           price=goodList.get(k).getPrice()*amount.get(i);
                           delivery= (int) (Math.sqrt(Math.abs(user_x^2-x^2)+Math.abs(user_y^2-y^2))*ratio);
                           total=delivery+price;
//                           System.out.println(v);
//                           System.out.println(total);
                           vbranch_price.put(v.getId(),total);
                       }
                   }
            }

            if(exists=false){
                //no branch has it
                combination comb=new combination(new v_branch(),-1);
                Map<Integer,combination> m=new HashMap<>();
                m.put(-1,comb);
            }
//            System.out.println(vbranch_price);
            SortedSet<Map.Entry<Integer,Integer>> sortedMap = entriesSortedByValues(vbranch_price);
//            System.out.println(sortedMap);
            Map.Entry<Integer,Integer> firstKey = sortedMap.first();
//            System.out.println(firstKey);
//            System.out.println(v_branchRepository.findById(firstKey.get()));
            Integer id=firstKey.getKey();
            v_branch v1=v_branchRepository.findById(id).get();
//            Map.Entry<Integer, Integer> kkk=sortedMap.entrySet().stream().findFirst().get();
//
//            System.out.println(kkk);
//            System.out.println(q);
            combination c=new combination(v1,sortedMap.first().getValue());
//            System.out.println(c);
            item_map.put(item_id,c);
        }

        return item_map;
    }
}
