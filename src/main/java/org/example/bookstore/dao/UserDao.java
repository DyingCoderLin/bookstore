package org.example.bookstore.dao;

import org.example.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserDao {
    User findByUserID(String userID);
    User save(User user);
    List<User> findAll();
    int countNormalUsers(String search);
    Page<User> findUsersByPageandUserID(Pageable pageable, String search);
    List<User> findUsersByIsAdminFalse();
}
