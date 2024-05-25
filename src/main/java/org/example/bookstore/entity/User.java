package org.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user_info")
public class User {
    @Id
    @Column(name = "user_id")
    private String userID;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "email")
    private String email;

    @Column(name = "default_address")
    private String defaultAddress;

    @Column(name = "balance")
    private Integer balance;

    @Column(name = "user_level")
    private Integer userLevel;

    @Column(name = "self_intro")
    private String selfIntro;

    //用于记录经验条
    @Column(name = "progress")
    private Integer progress;

    @JsonIgnore
    @OneToMany(mappedBy = "cart_user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems;

    @JsonIgnore
    @OneToMany(mappedBy = "order_user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    public User() {
        balance = 0;
        userLevel = 1;
        progress = 0;
    }

    public User(String userID, String password, String name, String nickname, String avatar, String email, String defaultAddress, Integer balance, Integer userLevel, String selfIntro, Integer progress) {
        this.userID = userID;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.avatar = avatar;
        this.email = email;
        this.defaultAddress = defaultAddress;
        this.balance = balance;
        this.userLevel = userLevel;
        this.selfIntro = selfIntro;
        this.progress = progress;
    }

    // getters
    public String getUserID() { return userID; }
    public String getPassword() { return password; }
    public String getName() { return name; }
    public String getNickname() { return nickname; }
    public String getAvatar() { return avatar; }
    public String getEmail() { return email; }
    public String getDefaultAddress() { return defaultAddress; }
    public Integer getBalance() { return balance; }
    public Integer getUserLevel() { return userLevel; }
    public String getSelfIntro() { return selfIntro; }
    public Integer getProgress() { return progress; }
    public List<CartItem> getCartItems() { return cartItems; }
    public List<Order> getOrders() { return orders; }

    // setters
    public void setUserID(String userID) { this.userID = userID; }
    public void setPassword(String password) { this.password = password; }
    public void setName(String name) { this.name = name; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public void setEmail(String email) { this.email = email; }
    public void setDefaultAddress(String defaultAddress) { this.defaultAddress = defaultAddress; }
    public void setBalance(Integer balance) { this.balance = balance; }
    public void setUserLevel(Integer userLevel) { this.userLevel = userLevel; }
    public void setSelfIntro(String selfIntro) { this.selfIntro = selfIntro; }
    public void setProgress(Integer progress) { this.progress = progress; }
}
