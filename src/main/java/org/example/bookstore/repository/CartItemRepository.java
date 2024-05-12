package org.example.bookstore.repository;

import org.example.bookstore.model.CartItem;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartItemID(Integer cartItemID);
}
