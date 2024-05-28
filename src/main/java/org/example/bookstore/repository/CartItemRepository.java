package org.example.bookstore.repository;

import org.example.bookstore.entity.CartItem;
import org.example.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartItemID(Integer cartItemID);
    Page<CartItem> findByTitleContainingAndCartuser(String title, User cartuser, Pageable pageable);
    long countByTitleContainingAndCartuser(String title, User cartuser);
}
