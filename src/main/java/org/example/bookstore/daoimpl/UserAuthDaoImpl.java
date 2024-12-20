package org.example.bookstore.daoimpl;

import org.example.bookstore.dao.UserAuthDao;
import org.example.bookstore.entity.UserAuth;
import org.example.bookstore.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserAuthDaoImpl implements UserAuthDao {
    @Autowired
    private UserAuthRepository userAuthRepository;

    @Override
    public UserAuth save(UserAuth userAuth) {
        return userAuthRepository.save(userAuth);
    }
    public Boolean existsByUserIDAndPassword(String userID, String password) {
        return userAuthRepository.existsByUserIDAndPassword(userID, password);
    }
}
