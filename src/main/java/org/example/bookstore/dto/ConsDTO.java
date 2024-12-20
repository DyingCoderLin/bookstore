package org.example.bookstore.dto;

import lombok.Data;
import org.example.bookstore.entity.User;

@Data
public class ConsDTO {
    //记录每个用户的消费总额，购买书籍数量
    private String userID;
    private int totalCost;
    private int totalNum;
    private String email;

    public ConsDTO(String userID, int totalCost, int totalNum, String email) {
        this.userID = userID;
        this.totalCost = totalCost;
        this.totalNum = totalNum;
        this.email = email;
    }
    public ConsDTO() {
        totalCost = 0;
        totalNum = 0;
    }
    public ConsDTO(User user) {
        this.userID = user.getUserID();
        this.email = user.getEmail();
        this.totalCost = 0;
        this.totalNum = 0;
    }
    public void addCost(int cost) {
        totalCost += cost;
    }
    public void addNum(int num) {
        totalNum += num;
    }
}
