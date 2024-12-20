package org.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderid")
    private Integer orderID;

    @Column(name = "address")
    private String address;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "tel")
    private String tel;

    @Column(name = "totalprice")
    private Integer totalPrice;

    @Column(name = "order_date")
    private Date orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User orderuser;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    public Order() {
    }

    public Order(String address, String receiver, String tel, Integer totalPrice, Date orderDate, User user) {
        this.address = address;
        this.receiver = receiver;
        this.tel = tel;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
        this.orderuser = user;
    }

    // getters
    public Integer getOrderID() { return orderID; }
    public String getAddress() { return address; }
    public String getReceiver() { return receiver; }
    public String getTel() { return tel; }
    public Integer getTotalPrice() { return totalPrice; }
    public Date getOrderDate() { return orderDate; }
    public User getUser() { return orderuser; }
    public List<OrderItem> getOrderItems() { return orderItems; }

    // setters
    public void setOrderID(Integer orderID) { this.orderID = orderID; }
    public void setAddress(String address) { this.address = address; }
    public void setReceiver(String receiver) { this.receiver = receiver; }
    public void setTel(String tel) { this.tel = tel; }
    public void setTotalPrice(Integer totalPrice) { this.totalPrice = totalPrice; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }
    public void setUser(User user) { this.orderuser = user; }

}
