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

import java.util.List;

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
        class ForLogin{
            public boolean isAdmin;
            ForLogin(){
                isAdmin = false;
            }
        }
        User user = userDao.findByUserID(userID);
        if(user.getIsBanned()){
            return new Response(400, "您的账户已被封禁");
        }
        if(user!=null && user.getPassword().equals(password)) {
            //要将是否为管理员加入Response的data部分再返回
            ForLogin fl = new ForLogin();
            fl.isAdmin = user.getIsAdmin();
            return new Response<ForLogin>(200, "登陆成功", fl);
        }
        else{
            return new Response(400, "用户名或密码错误");
        }
    }

    public Response register(String userID, String password ,String email) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info(userID + " is trying to register" + " with password " + password);
        if (userDao.findByUserID(userID) != null) {
            return new Response(400, "用户名已存在");
        }
        User user = new User(userID, password,false,false, "", "", "", email, "", 0, 1, "", 0);
        userDao.save(user);
        return new Response(200, "注册成功");
    }

    public void save(User user) {
        userDao.save(user);
    }

    public List<User> findAll() {
        return userDao.findAll();
    }
}
