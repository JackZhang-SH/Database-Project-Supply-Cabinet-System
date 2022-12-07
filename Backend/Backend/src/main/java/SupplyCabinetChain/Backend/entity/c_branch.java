package SupplyCabinetChain.Backend.entity;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Objects;
//@Embeddable
//class CompositeKeyC implements Serializable {
//
//    private int c_user_id;
//    private int c_branch_id;
//    public CompositeKeyC(){
//
//
//    }
////    public CompositeKeyC(int c_user_id) {
////        this.c_user_id = c_user_id;
////    }
//
//    public int getC_user_id() {
//        return c_user_id;
//    }
//
//    public void setC_user_id(int c_user_id) {
//        this.c_user_id = c_user_id;
//    }
//
//    public int getC_branch_id() {
//        return c_branch_id;
//    }
//
//    public void setC_branch_id(int c_branch_id) {
//        c_branch_id = c_branch_id;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        System.out.println("equals");
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        CompositeKeyC that = (CompositeKeyC) o;
//        return c_user_id == that.c_user_id && c_branch_id == that.c_branch_id;
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(c_user_id, c_branch_id);
//    }


@Entity
@Table(name = "c_branch")
public class c_branch implements Serializable{
    @Column(name = "id")
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int id;
    @Column(name = "c_user_id")
    private int c_user_id;
    @Column(name = "c_branch_id")
    private int c_branch_id;
    @Column(name = "locationx")
    private int locationx;
    @Column(name = "locationy")
    private int locationy;
    public c_branch(){


    }

    public c_branch(int c_user_id, int locationx, int locationy) {
        this.c_user_id = c_user_id;
        this.locationx = locationx;
        this.locationy = locationy;
        this.c_branch_id=1;
    }

    @Override
    public String toString() {
        return "c_branch{" +
                "id=" + id +
                ", c_user_id=" + c_user_id +
                ", c_branch_id=" + c_branch_id +
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

    public int getC_user_id() {
        return c_user_id;
    }

    public void setC_user_id(int c_user_id) {
        this.c_user_id = c_user_id;
    }

    public int getC_branch_id() {
        return c_branch_id;
    }

    public void setC_branch_id(int c_branch_id) {
        this.c_branch_id = c_branch_id;
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
}
