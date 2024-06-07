package org.example.bookstore.dto;

import org.example.bookstore.entity.CartItem;
import lombok.Data;
import org.example.bookstore.utils.MyUtils;
import org.springframework.data.relational.core.sql.In;

@Data
public class CartItemDTO {
    private Integer cartItemID;

    private Double singlePrice;

    private Double price;

    private Integer quantity;

    private String img;

    private String title;

    private Integer inventory;

    public CartItemDTO() {
    }

    public CartItemDTO(CartItem cartItem) {
        this.cartItemID = cartItem.getCartItemID();
        this.singlePrice = MyUtils.toRMB(cartItem.getCartbook().getPrice());
        this.quantity = cartItem.getQuantity();
        this.price = MyUtils.toRMB(cartItem.getCartbook().getPrice() * cartItem.getQuantity());
        this.img = cartItem.getCartbook().getImg();
        this.title = cartItem.getCartbook().getTitle();
        this.inventory = cartItem.getCartbook().getInventory();
//        this.book = new BookDTO(cartItem.getBook());
    }
}
