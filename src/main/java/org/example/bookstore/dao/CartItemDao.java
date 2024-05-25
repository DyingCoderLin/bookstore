package org.example.bookstore.dao;

import org.example.bookstore.entity.CartItem;

import java.util.List;

public interface CartItemDao {
    CartItem findByCartItemID(Integer cartItemID);
    CartItem save(CartItem cartItem);
    List<CartItem> findAll();
    void delete(CartItem cartItem);
}
