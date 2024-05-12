package org.example.bookstore.model;

public class UserData {
    private String userID;
    private String name;
    private String nickname;
    private String avatar;
    private String email;
    private String defaultAddress;
    private Integer balance;
    private Integer userLevel;
    private String selfIntro;
    private Integer progress;

    public UserData() {
    }
    public UserData(User user) {
        this.userID = user.getUserID();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.avatar = user.getAvatar();
        this.email = user.getEmail();
        this.defaultAddress = user.getDefaultAddress();
        this.balance = user.getBalance();
        this.userLevel = user.getUserLevel();
        this.selfIntro = user.getSelfIntro();
        this.progress = user.getProgress();
    }

    // getters
    public String getUserID() { return userID; }
    public String getName() { return name; }
    public String getNickname() { return nickname; }
    public String getAvatar() { return avatar; }
    public String getEmail() { return email; }
    public String getDefaultAddress() { return defaultAddress; }
    public Integer getBalance() { return balance; }
    public Integer getUserLevel() { return userLevel; }
    public String getSelfIntro() { return selfIntro; }
    public Integer getProgress() { return progress; }
    // setters
    public void setUserID(String userID) { this.userID = userID; }
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
