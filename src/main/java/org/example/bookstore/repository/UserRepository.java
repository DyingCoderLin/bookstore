package org.example.bookstore.repository;

import org.example.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUserID(String userID);
    long countByIsAdminFalseAndUserIDContaining(String search);
    Page<User> findByIsAdminFalseAndUserIDContaining(Pageable pageable, String search);
    List<User> findUsersByIsAdminFalse();
}
