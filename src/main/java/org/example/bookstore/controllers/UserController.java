package org.example.bookstore.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.User;
import org.example.bookstore.service.*;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.dto.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
//@Scope("session")
@RequestMapping("/api") // 指定父路径为/api
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/login")
    public Response login(@RequestBody Map<String,Object> loginRequest) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Login Request");
        String userID = (String) loginRequest.get("username");
        String password = (String) loginRequest.get("password");
        return userService.login(userID, password);
    }

    @PostMapping("/logout")
    public Response logout() {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Logout Request");
        HttpSession session = MyUtils.getSession();
        return userService.logout(session);
//        if (session != null) {
//            long sessionDuration = timeService.stopTimer();
//            session.invalidate();
//            return new Response(200, "登出成功，会话时长：" + sessionDuration + "秒");
//        }
////        if(session.getAttribute("userID") == null) return new Response(400, "未登录");
////        session.removeAttribute("userID");
//        return new Response(400, "未登录");
    }

    @GetMapping("/getUser")
    public UserDTO getUser() {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        log.info("Get User Request from : " + userID);
        UserDTO userDTO = new UserDTO(userService.findByUserID(userID));
        return userDTO;
    }

    @PostMapping("/register")
    public Response register(@RequestBody Map<String,Object> registerRequest) {
        String userID = (String) registerRequest.get("username");
        String password = (String) registerRequest.get("password");
        String email = (String) registerRequest.get("email");
        return userService.register(userID, password,email);
    }

    @PostMapping("updateUser")
    public Response updateUser(@RequestBody Map<String,Object> requestBody) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Update User Request");
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        String nickname = (String) requestBody.get("nickname");
        if(nickname != null && !nickname.equals("")) user.setNickname(nickname);
        String defaultAddress = (String) requestBody.get("defaultAddress");
        if(defaultAddress != null && !defaultAddress.equals("")) user.setDefaultAddress(defaultAddress);
        String name = (String) requestBody.get("name");
        if(name != null && !name.equals("")) user.setName(name);
        String email = (String) requestBody.get("email");
        if(email != null && !email.equals("")) user.setEmail(email);
        String selfIntro = (String) requestBody.get("selfIntro");
        if(selfIntro != null && !selfIntro.equals("")) user.setSelfIntro(selfIntro);
        userService.save(user);
        return new Response(200, "更新成功");
    }

    @PostMapping("updateAvatar")
    public Response updateAvatar(@RequestBody Map<String,Object> requestBody) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Update Avatar Request");
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        String avatar = (String) requestBody.get("base64Image");
        if(avatar != null && !avatar.equals("")) user.setAvatar(avatar);
        userService.save(user);
        return new Response(200, "更新成功");
    }

    //for administrator
    @GetMapping("/getAllUsers")
    public List<UserDTO> getAllUsers() {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Get All Users Request");
        List<UserDTO> userDTOs = new ArrayList<>();
        for(User user : userService.findAll()) {
            if(user.getIsAdmin()) continue;
            userDTOs.add(new UserDTO(user));
        }
        return userDTOs;
    }

    @PostMapping("/getUsersByPageAndUserID")
    public Response getUserByPageAndUserID(@RequestBody Map<String,Object> requestBody) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
        String search = (String) requestBody.get("search");
        log.info("page: " + page + " size: " + size + " search: " + search);
        return userService.findByPageandUserID(page, size, search);
    }

    @GetMapping("/banUser/{userID}")
    public Response banUser(@PathVariable String userID) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Ban User Request for : " + userID);
        User user = userService.findByUserID(userID);
        user.setIsBanned(true);
        userService.save(user);
        return new Response(200, "已禁用用户"+userID+"的账户");
    }

    @GetMapping("/unBanUser/{userID}")
    public Response unBanUser(@PathVariable String userID) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Unban User Request for : " + userID);
        User user = userService.findByUserID(userID);
        user.setIsBanned(false);
        userService.save(user);
        return new Response(200, "已解禁用户"+userID+"的账户");
    }

    @PostMapping("/statUsersByDate")
    public Response statUsersByDate(@RequestBody Map<String,Object> requestBody) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Stat Users By Date Request");
        Date startDate = Date.valueOf((String) requestBody.get("startDate"));
        Date endDate = Date.valueOf((String) requestBody.get("endDate"));
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
//        List<User> users = userService.findAll();
        List<Order> orders = orderService.findByDate(startDate, endDate);
        return userService.setConsDTOwithOrders(orders, page, size);
    }

}
