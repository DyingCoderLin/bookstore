package org.example.bookstore.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table (name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Integer cartItemID;

//    @Column(name = "price")
//    private Integer price;

    @Column(name = "quantity")
    private Integer quantity;

//    @Column(name = "img")
//    private String img;

//    @Column(name = "title")
//    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book cartbook;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User cartuser;

    public CartItem() {
        this.quantity = 1;
    }

    public CartItem(Integer quantity, Book book, User cart_user) {
//        this.price = price;
        this.quantity = quantity;
        this.cartbook = book;
        this.cartuser = cart_user;
    }

//    public void detach(){
//        this.cartbook.getCartItems().remove(this);
//        this.cartuser.getCartItems().remove(this);
//    }

}

