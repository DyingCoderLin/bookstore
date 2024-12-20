package org.example.bookstore.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.example.bookstore.entity.Book;
import org.example.bookstore.utils.MyUtils;
import org.springframework.data.relational.core.sql.In;

@Data
public class BookDTO {
    private Integer bookID;

    private String img;

    private String title;

    private String author;

    private Double price;

    private String description;

    private String detail;

    private Integer sales;

    private Boolean status;

    private Integer inventory;

    private String isbn;

    public BookDTO() {
    }

    public BookDTO(Integer bookID, String img, String title, String author, Integer price, String description, String detail, Integer sales, Boolean status, Integer inventory, String isbn) {
        this.bookID = bookID;
        this.img = img;
        this.title = title;
        this.author = author;
        this.price = MyUtils.toRMB(price);
        this.description = description;
        this.detail = detail;
        this.sales = sales;
        this.status = status;
        this.inventory = inventory;
        this.isbn = isbn;
    }

    public BookDTO(Book book) {
        this.bookID = book.getBookID();
        this.inventory = book.getInventory();
        this.img = book.getImg();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.price = MyUtils.toRMB(book.getPrice());
        this.description = book.getDescription();
        this.detail = book.getDetail();
        this.sales = book.getSales();
        this.status = book.getStatus();
        this.isbn = book.getIsbn();
    }
}
