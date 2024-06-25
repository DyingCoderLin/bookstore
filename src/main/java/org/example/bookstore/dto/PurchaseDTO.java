package org.example.bookstore.dto;

import lombok.Data;
import org.example.bookstore.entity.Book;
import org.example.bookstore.utils.MyUtils;

@Data
public class PurchaseDTO {
    private Integer quantity;
//    private Double singlePrice;
    private Integer price;
    private String title;
    private String author;
    private Integer calculatePrice;
    private String img;

    public PurchaseDTO() {
        quantity = 0;
        price = 0;
        calculatePrice = 0;
    }

    public PurchaseDTO(Book book) {
        this.quantity = 0;
        this.calculatePrice = 0;
        this.price = 0;
//        this.singlePrice = MyUtils.toRMB(book.getPrice());
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.img = book.getImg();
    }

    public void addPrice(Integer price){
        this.calculatePrice += price;
        this.price = calculatePrice;
    }

}
