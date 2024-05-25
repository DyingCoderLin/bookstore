package org.example.bookstore.repository;

import org.example.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUserID(String userID);
}
