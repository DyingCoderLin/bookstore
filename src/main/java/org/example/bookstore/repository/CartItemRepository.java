package org.example.bookstore.repository;

import org.example.bookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartItemID(Integer cartItemID);
}
