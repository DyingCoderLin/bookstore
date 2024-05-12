package org.example.bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table (name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer bookID;

    @Column(name = "img")
    private String img;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "price")
    private Integer price;

    @Column(name = "description")
    private String description;

    @Column(name = "detail")
    private String detail;

    @Column(name = "sales")
    private String sales;

    @Column(name = "status")
    private String status;

    //同一本书会出现在不同订单里，但是这个会很少用到
    @JsonIgnore
    @OneToMany(mappedBy = "cart_book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems;

    public Book(Integer bookID, String img, String title, String author, Integer price, String description, String detail, String sales, String status) {
        this.bookID = bookID;
        this.img = img;
        this.title = title;
        this.author = author;
        this.price = price;
        this.description = description;
        this.detail = detail;
        this.sales = sales;
        this.status = status;
    }

    public Book() {
    }

    // 添加 getters 和 setters
    public long getId() {
        return bookID;
    }

    public void setId(Integer id) {
        this.bookID = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTitle() {
        return title;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getSales() {
        return sales;
    }

    public void setSales(String sales) {
        this.sales = sales;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
