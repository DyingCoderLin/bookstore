package org.example.bookstore.dto;

import lombok.Data;
import org.example.bookstore.entity.User;
import org.example.bookstore.utils.MyUtils;

@Data
public class UserDTO {
    private String userID;
    private String name;
    private String nickname;
    private String avatar;
    private String email;
    private String defaultAddress;
    private Double balance;
    private Integer userLevel;
    private String selfIntro;
    private Integer progress;
    private Boolean isBanned;

    public UserDTO() {
    }
    public UserDTO(User user) {
        this.userID = user.getUserID();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.avatar = user.getAvatar();
        this.email = user.getEmail();
        this.defaultAddress = user.getDefaultAddress();
        this.balance = MyUtils.toRMB(user.getBalance());
        this.userLevel = user.getUserLevel();
        this.selfIntro = user.getSelfIntro();
        this.progress = user.getProgress();
        this.isBanned = user.getIsBanned();
    }
}
