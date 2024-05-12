package org.example.bookstore.model;

import java.util.ArrayList;
import java.util.List;

public class OrderData {
    private Integer orderID;
    private String orderDate;
    private String address;
    private String receiver;
    private String tel;
    private Integer totalPrice;
    public class OrderItemData {
        private Integer price;
        private Integer quantity;
        private String img;
        private String title;

        public OrderItemData() {
        }

        public OrderItemData(OrderItem orderItem) {
            this.price = orderItem.getPrice();
            this.quantity = orderItem.getQuantity();
            this.img = orderItem.getImg();
            this.title = orderItem.getTitle();
        }
        // getters
        public Integer getPrice() { return price; }
        public Integer getQuantity() { return quantity; }
        public String getImg() { return img; }
        public String getTitle() { return title; }
        // setters
        public void setPrice(Integer price) { this.price = price; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public void setImg(String img) { this.img = img; }
        public void setTitle(String title) { this.title = title; }
    }

    private List<OrderItemData> orderItemDatas;

    public OrderData() {
    }

    public OrderData(Order order) {
        this.orderItemDatas = new ArrayList<>();
        this.orderID = order.getOrderID();
        this.orderDate = order.getOrderDate().toString();
        this.address = order.getAddress();
        this.receiver = order.getReceiver();
        this.tel = order.getTel();
        this.totalPrice = order.getTotalPrice();
        for(OrderItem orderItem : order.getOrderItems()){
            orderItemDatas.add(new OrderItemData(orderItem));
        }
    }

    // getters
    public Integer getOrderID() { return orderID; }
    public String getOrderDate() { return orderDate; }
    public String getAddress() { return address; }
    public String getReceiver() { return receiver; }
    public String getTel() { return tel; }
    public Integer getTotalPrice() { return totalPrice; }
    public List<OrderItemData> getOrderItemDatas() { return orderItemDatas; }
    // setters
    public void setOrderID(Integer orderID) { this.orderID = orderID; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
    public void setAddress(String address) { this.address = address; }
    public void setReceiver(String receiver) { this.receiver = receiver; }
    public void setTel(String tel) { this.tel = tel; }
    public void setTotalPrice(Integer totalPrice) { this.totalPrice = totalPrice; }
    public void setOrderItemDatas(List<OrderItemData> orderItemDatas) { this.orderItemDatas = orderItemDatas; }

}
