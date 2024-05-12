package org.example.bookstore.model;

import org.example.bookstore.model.CartItem;
import org.springframework.data.relational.core.sql.In;

public class CartItemData {
    private Integer cartItemID;

    private Integer price;

    private Integer quantity;

    private String img;

    private String title;

    public CartItemData() {
    }

    public CartItemData(CartItem cartItem) {
        this.cartItemID = cartItem.getCartItemID();
        this.price = cartItem.getPrice();
        this.quantity = cartItem.getQuantity();
        this.img = cartItem.getImg();
        this.title = cartItem.getTitle();
    }

    // getters
    public Integer getCartItemID() {return cartItemID;}
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
