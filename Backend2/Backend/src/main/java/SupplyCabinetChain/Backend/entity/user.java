package SupplyCabinetChain.Backend.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class user {



    @Column(name = "user_id")
    @Id
    @SequenceGenerator(
            name="user_sequence",
            sequenceName= "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private int user_id;

    @Column(name = "user_name")
    private String user_name;
    @Column(name = "user_password")
    private String user_password;
    @Column(name = "user_type")
    private String user_type;
    @Transient
    private int numberOfBranch;
    public user() {
          this.user_name="undefined";
    }


    @Override
    public String toString() {
        return "user{" +
                "user_id=" + user_id +
                ", user_name='" + user_name + '\'' +
                ", user_password='" + user_password + '\'' +
                ", user_type='" + user_type + '\'' +
                '}';
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public user(int user_id, String user_password) {
        this.user_id = user_id;
        this.user_password = user_password;
    }

    public user(String user_name, String user_password, String user_type) {

        this.user_name = user_name;
        this.user_password = user_password;
        this.user_type = user_type;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Id
    public int getUser_id() {
        return user_id;
    }
}
