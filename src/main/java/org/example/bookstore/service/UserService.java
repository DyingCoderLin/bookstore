package org.example.bookstore.service;

import org.example.bookstore.controllers.UserController;
import org.example.bookstore.model.Response;
import org.example.bookstore.repository.UserRepository;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.example.bookstore.model.*;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUserID(String userID) {
        return userRepository.findByUserID(userID);
    }

    public Response login(String userID, String password) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info(userID + " is trying to login" + " with password " + password);
        String cookie = "userID=" + userID + ";";
        if(userRepository.findByUserID(userID).getPassword().equals(password)) {
            return new Response(200, "登陆成功", cookie);
        }
        else{
            return new Response(400, "用户名或密码错误");
        }
    }

}
