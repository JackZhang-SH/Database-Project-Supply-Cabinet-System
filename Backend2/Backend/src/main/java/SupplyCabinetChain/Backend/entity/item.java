package SupplyCabinetChain.Backend.entity;

import jakarta.persistence.*;

import java.util.TreeMap;

@Entity
@Table(name = "item")
public class item {
    @Column(name = "item_id")
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int item_id;
    @Column(name = "item_name")
    private String item_name;
    public item(){
        this.item_name="Undefined";
    }
    public item( String item_name) {
        this.item_name = item_name;
    }
    //<v_branch's id, price>
    @Override
    public String toString() {
        return "item{" +
                "item_id=" + item_id +
                ", item_name='" + item_name + '\'' +
                '}';
    }

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

}
