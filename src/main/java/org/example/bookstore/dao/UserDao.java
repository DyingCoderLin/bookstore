package org.example.bookstore.dao;

import org.example.bookstore.entity.User;

public interface UserDao {
    User findByUserID(String userID);
    User save(User user);
}
