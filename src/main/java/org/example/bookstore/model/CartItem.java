package org.example.bookstore.model;

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

    @Column(name = "book_id")
    private Integer bookID;

    @Column(name = "user_id")
    private Integer userID;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
    @JoinColumn(name = "book_id")
    private Book cart_book;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id")
    private User cart_user;

    public CartItem() {
        this.quantity = 1;
    }

    public CartItem(Integer price, Integer quantity, Book book, User cart_user) {
        this.price = price;
        this.quantity = quantity;
        this.cart_book = book;
        this.cart_user = cart_user;
    }

    // getters
    public Integer getCartItemID() { return cartItemID; }
    public Integer getPrice() { return price; }
    public Integer getQuantity() { return quantity; }
    public Book getBook() { return cart_book; }
    public User getCart_user() { return cart_user; }
    public String getImg() { return img; }
    public String getTitle() { return title; }
    public Integer getBookID() { return bookID; }
    public Integer getUserID() { return userID; }

    // setters
    public void setCartItemID(Integer cartItemID) { this.cartItemID = cartItemID; }
    public void setPrice(Integer price) { this.price = price; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setBook(Book book) {
        this.cart_book = book;
        this.img = book.getImg();
        this.title = book.getTitle();
    }
    public void setCart_user(User cart_user) { this.cart_user = cart_user; }
    public void detach(){
        this.cart_book.getCartItems().remove(this);
        this.cart_user.getCartItems().remove(this);
    }

}

