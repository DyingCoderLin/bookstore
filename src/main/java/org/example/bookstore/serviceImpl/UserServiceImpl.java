package org.example.bookstore.serviceImpl;

import org.example.bookstore.controllers.UserController;
import org.example.bookstore.dao.UserDao;
import org.example.bookstore.entity.User;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.UserService;
import org.example.bookstore.dto.Response;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public User findByUserID(String userID) {
        return userDao.findByUserID(userID);
    }

    public Response login(String userID, String password) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info(userID + " is trying to login" + " with password " + password);
        MyUtils.setSession(userID);
        if(userDao.findByUserID(userID).getPassword().equals(password)) {
            return new Response(200, "登陆成功");
        }
        else{
            return new Response(400, "用户名或密码错误");
        }
    }

    public Response register(String userID, String password) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info(userID + " is trying to register" + " with password " + password);
        if (userDao.findByUserID(userID) != null) {
            return new Response(400, "用户名已存在");
        }
        User user = new User(userID, password, "", "", "", "", "", 0, 1, "", 0);
        userDao.save(user);
        return new Response(200, "注册成功");
    }
}
