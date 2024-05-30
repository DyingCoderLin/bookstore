package org.example.bookstore.daoimpl;

import org.example.bookstore.dao.UserDao;
import org.example.bookstore.entity.User;
import org.example.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByUserID(String userID) {
        return userRepository.findByUserID(userID);
    }
    public User save(User user) {
        return userRepository.save(user);
    }
    public List<User> findAll() {
        return userRepository.findAll();
    }
    public int countNormalUsers(String search) {
        return (int)userRepository.countByIsAdminFalseAndUserIDContaining(search);
    }
    public Page<User> findUsersByPageandUserID(Pageable pageable, String search) {
        return userRepository.findByIsAdminFalseAndUserIDContaining(pageable, search);
    }
    public List<User> findUsersByIsAdminFalse() {
        return userRepository.findUsersByIsAdminFalse();
    }
}
