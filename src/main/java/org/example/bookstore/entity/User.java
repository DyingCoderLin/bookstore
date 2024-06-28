package org.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private String userID;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "balance")
    private Integer balance;

    @Column(name = "user_level")
    private Integer userLevel;

    @Column(name = "self_intro")
    private String selfIntro;

    //用于记录经验条
    @Column(name = "progress")
    private Integer progress;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @Column(name = "email")
    private String email;

    @Column(name = "default_address")
    private String defaultAddress;

    @Column(name = "is_banned")
    private Boolean isBanned;

    @JsonIgnore
    @OneToMany(mappedBy = "cartuser", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<CartItem> cartItems;

    @JsonIgnore
    @OneToMany(mappedBy = "orderuser", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Order> orders;

//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private UserAuth userAuth;

    public User() {
        balance = 1000000;
        userLevel = 1;
        progress = 0;
    }

    public User(String userID,Boolean isAdmin,Boolean isBanned, String name, String nickname, String avatar, Integer balance, Integer userLevel, String selfIntro, Integer progress, String email, String defaultAddress) {
        this.userID = userID;
        this.isAdmin = isAdmin;
        this.isBanned = isBanned;
        this.name = name;
        this.nickname = nickname;
        this.avatar = avatar;
        this.balance = balance;
        this.userLevel = userLevel;
        this.selfIntro = selfIntro;
        this.progress = progress;
        this.email = email;
        this.defaultAddress = defaultAddress;
    }
}
