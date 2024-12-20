package org.example.bookstore.dao;

import org.example.bookstore.entity.UserAuth;

public interface UserAuthDao {
    UserAuth save(UserAuth userAuth);
    Boolean existsByUserIDAndPassword(String userID, String password);
}
