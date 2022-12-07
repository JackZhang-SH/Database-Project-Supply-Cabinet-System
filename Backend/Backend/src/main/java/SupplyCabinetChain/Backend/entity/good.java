package SupplyCabinetChain.Backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "good")
public class good {
    @Column(name = "good_id")
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int good_id;
    @Column(name = "V_branch_id")
    private int V_branch_id;
    @Column(name = "V_user_id")
    private int V_user_id;
    @Column(name = "Price")
    private int Price;
    @Column(name = "item_id")
    private int item_id;
    public good(){

    }
    public good(int V_branch_id, int V_user_id, int price, int item_id) {
        this.V_branch_id = V_branch_id;
        this.V_user_id = V_user_id;
        Price = price;
        this.item_id = item_id;
    }

    public int getGood_id() {
        return good_id;
    }

    public void setGood_id(int good_id) {
        this.good_id = good_id;
    }

    public int getV_branch_id() {
        return V_branch_id;
    }

    public void setV_branch_id(int v_branch_id) {
        V_branch_id = v_branch_id;
    }

    public int getV_user_id() {
        return V_user_id;
    }

    public void setV_user_id(int v_user_id) {
        V_user_id = v_user_id;
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    @Override
    public String toString() {
        return "good{" +
                "good_id=" + good_id +
                ", V_branch_id=" + V_branch_id +
                ", V_user_id=" + V_user_id +
                ", Price=" + Price +
                ", item_id='" + item_id + '\'' +
                '}';
    }
}
