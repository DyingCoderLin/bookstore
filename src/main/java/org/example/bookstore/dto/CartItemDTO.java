package org.example.bookstore.dto;

import org.example.bookstore.entity.CartItem;
import lombok.Data;
import org.example.bookstore.utils.MyUtils;

@Data
public class CartItemDTO {
    private Integer cartItemID;

    private Double price;

    private Integer quantity;

    private String img;

    private String title;

    public CartItemDTO() {
    }

    public CartItemDTO(CartItem cartItem) {
        this.cartItemID = cartItem.getCartItemID();
        this.price = MyUtils.toRMB(cartItem.getPrice());
        this.quantity = cartItem.getQuantity();
        this.img = cartItem.getImg();
        this.title = cartItem.getTitle();
    }
}
