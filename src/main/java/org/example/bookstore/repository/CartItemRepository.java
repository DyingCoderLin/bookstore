package org.example.bookstore.repository;

import org.example.bookstore.entity.CartItem;
import org.example.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartItemID(Integer cartItemID);
//    Page<CartItem> findByTitleContainingAndCartuser(String title, User cartuser, Pageable pageable);
//    long countByTitleContainingAndCartuser(String title, User cartuser);
    @Query("SELECT ci FROM CartItem ci WHERE ci.cartbook.title LIKE %:title% AND ci.cartuser = :cartuser")
    Page<CartItem> findByTitleContainingAndCartuser(@Param("title") String title, @Param("cartuser") User cartuser, Pageable pageable);

    @Query("SELECT COUNT(ci) FROM CartItem ci WHERE ci.cartbook.title LIKE %:title% AND ci.cartuser = :cartuser")
    long countByTitleContainingAndCartuser(@Param("title") String title, @Param("cartuser") User cartuser);
}
