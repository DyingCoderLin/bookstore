package org.example.bookstore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_auth")
public class UserAuth {
    @Id
    @Column(name = "userid", nullable = false)
    private String userID;

    @Column(name = "password")
    private String password;

//    @Column(name = "is_banned")
//    private Boolean isBanned;
//
//    @Column(name = "email")
//    private String email;
//
//    @Column(name = "default_address")
//    private String defaultAddress;

//    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
//    @JoinColumn(name = "userid", referencedColumnName = "user_id", insertable = false, updatable = false)
//    private User user;

    public UserAuth() {
//        isBanned = false;
    }

    public UserAuth(String userID, String password) {
//        this.user = user;
        this.userID = userID;
        this.password = password;
//        this.isBanned = isBanned;
//        this.email = email;
    }

    // getters
    public String getPassword() { return password; }
//    public Boolean getIsBanned() { return isBanned; }
//    public String getEmail() { return email; }
//    public User getUser() { return user; }
    public String getUserID() { return userID; }
//    public String getDefaultAddress() { return defaultAddress; }

    // setters
    public void setPassword(String password) { this.password = password; }
//    public void setIsBanned(Boolean isBanned) { this.isBanned = isBanned; }
//    public void setEmail(String email) { this.email = email; }
//    public void setUser(User user) { this.user = user; }
    public void setUserID(String userID) { this.userID = userID; }
//    public void setDefaultAddress(String defaultAddress) { this.defaultAddress = defaultAddress; }
}
