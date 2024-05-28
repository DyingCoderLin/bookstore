package org.example.bookstore.dao;

import org.example.bookstore.entity.User;

import java.util.List;

public interface UserDao {
    User findByUserID(String userID);
    User save(User user);
    List<User> findAll();
}
