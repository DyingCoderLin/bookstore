package org.example.bookstore.dto;

import lombok.Data;
import org.example.bookstore.entity.Book;
import org.example.bookstore.utils.MyUtils;

@Data
public class PurchaseDTO {
    private Integer quantity;
//    private Double singlePrice;
    private Double price;
    private String title;
    private String author;
    private String img;

    public PurchaseDTO() {
        quantity = 0;
    }

    public PurchaseDTO(Book book) {
        this.quantity = 0;
        this.price = 0.0;
//        this.singlePrice = MyUtils.toRMB(book.getPrice());
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.img = book.getImg();
    }

}
