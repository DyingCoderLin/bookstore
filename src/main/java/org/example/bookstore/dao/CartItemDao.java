package org.example.bookstore.dao;

import org.example.bookstore.entity.CartItem;
import org.example.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CartItemDao {
    CartItem findByCartItemID(Integer cartItemID);
    CartItem save(CartItem cartItem);
    List<CartItem> findAll();
    void delete(CartItem cartItem);
    int countwithUserIDandTitle(User user, String title);
    Page<CartItem> findByPageandTitle(Pageable pageable, String search , User cartUser);
}
