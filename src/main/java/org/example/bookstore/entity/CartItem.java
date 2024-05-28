package org.example.bookstore.entity;

import jakarta.persistence.*;

@Entity
@Table (name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Integer cartItemID;

    @Column(name = "price")
    private Integer price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "img")
    private String img;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
    @JoinColumn(name = "book_id")
    private Book cartbook;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id")
    private User cartuser;

    public CartItem() {
        this.quantity = 1;
    }

    public CartItem(Integer price, Integer quantity, Book book, User cart_user) {
        this.price = price;
        this.quantity = quantity;
        this.cartbook = book;
        this.cartuser = cart_user;
    }

    // getters
    public Integer getCartItemID() { return cartItemID; }
    public Integer getPrice() { return price; }
    public Integer getQuantity() { return quantity; }
    public Book getBook() { return cartbook; }
    public User getCart_user() { return cartuser; }
    public String getImg() { return img; }
    public String getTitle() { return title; }

    // setters
    public void setCartItemID(Integer cartItemID) { this.cartItemID = cartItemID; }
    public void setPrice(Integer price) { this.price = price; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setBook(Book book) {
        this.cartbook = book;
        this.img = book.getImg();
        this.title = book.getTitle();
    }
    public void setCart_user(User cart_user) { this.cartuser = cart_user; }
    public void detach(){
        this.cartbook.getCartItems().remove(this);
        this.cartuser.getCartItems().remove(this);
    }

}

