package org.example.bookstore.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.example.bookstore.entity.Book;

@Data
public class BookDTO {
    private Integer bookID;

    private String img;

    private String title;

    private String author;

    private Integer price;

    private String description;

    private String detail;

    private String sales;

    private String status;

    public BookDTO() {
    }

    public BookDTO(Integer bookID, String img, String title, String author, Integer price, String description, String detail, String sales, String status) {
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

    public BookDTO(Book book) {
        this.bookID = book.getBookID();
        this.img = book.getImg();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.price = book.getPrice();
        this.description = book.getDescription();
        this.detail = book.getDetail();
        this.sales = book.getSales();
        this.status = book.getStatus();
    }
}
