package SupplyCabinetChain.Backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "v_branch")
public class v_branch implements Serializable{
    @Column(name = "id")
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int id;
    @Column(name = "v_user_id")
    private int v_user_id;
    @Column(name = "v_branch_id")
    private int v_branch_id;
    @Column(name = "locationx")
    private int locationx;
    @Column(name = "locationy")
    private int locationy;
    public v_branch(){

    }

    @Override
    public String toString() {
        return "v_branch{" +
                "id=" + id +
                ", v_user_id=" + v_user_id +
                ", v_branch_id=" + v_branch_id +
                ", locationx=" + locationx +
                ", locationy=" + locationy +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getV_user_id() {
        return v_user_id;
    }

    public void setV_user_id(int v_user_id) {
        this.v_user_id = v_user_id;
    }

    public int getV_branch_id() {
        return v_branch_id;
    }

    public void setV_branch_id(int v_branch_id) {
        this.v_branch_id = v_branch_id;
    }

    public int getLocationx() {
        return locationx;
    }

    public void setLocationx(int locationx) {
        this.locationx = locationx;
    }

    public int getLocationy() {
        return locationy;
    }

    public void setLocationy(int locationy) {
        this.locationy = locationy;
    }

    public v_branch(int v_user_id, int locationx, int locationy) {
        this.v_user_id = v_user_id;
        this.locationx = locationx;
        this.locationy = locationy;
        this.v_branch_id=1;
    }
}
