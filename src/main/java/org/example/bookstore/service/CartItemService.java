package org.example.bookstore.service;

import org.example.bookstore.entity.CartItem;

import java.util.List;

public interface CartItemService {

    public List<CartItem> findAll();

    public void save(CartItem cartItem);
    public void delete(CartItem cartItem) ;
    public CartItem findByCartItemId(Integer cartItemID);
}
