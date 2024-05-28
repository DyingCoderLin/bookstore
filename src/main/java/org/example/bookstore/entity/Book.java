package org.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.data.relational.core.sql.In;

import java.util.List;

@Entity
@Table (name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer bookID;

    @Column(name = "inventory")
    private Integer inventory;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "sales")
    private Integer sales;

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

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "is_available")
    private Boolean isAvailable;

    //同一本书会出现在不同订单里，但是这个会很少用到
    @JsonIgnore
    @OneToMany(mappedBy = "cartbook", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems;

    public Book(Integer bookID, Integer inventory, Integer sales,String img, String title, String author, Integer price, String description, String detail,String isbn) {
        this.bookID = bookID;
        this.inventory = inventory;
        if(inventory == 0)
            this.status = false;
        this.img = img;
        this.title = title;
        this.author = author;
        this.price = price;
        this.description = description;
        this.detail = detail;
        this.sales = sales;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    public Book() {
        img = "/myImages/book2.jpg";
        this.isAvailable = true;
        this.title = "Title";
        this.author = "Author";
        this.price = 0;
        this.description = "Description";
        this.detail = "Detail";
        this.isbn = "ISBN";
        this.inventory = 0;
        this.sales = 0;
    }

    // 添加 getters 和 setters
    public Integer getBookID() {
        return bookID;
    }

    public void setBookID(Integer id) {
        this.bookID = id;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
        if(inventory == 0)
            this.status = false;
        else
            this.status = true;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
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

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
