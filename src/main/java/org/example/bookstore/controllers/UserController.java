package org.example.bookstore.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.entity.User;
import org.example.bookstore.service.*;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.dto.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api") // 指定父路径为/api
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Response login(@RequestBody Map<String,Object> loginRequest) {
        final Logger log = org.slf4j.LoggerFactory.getLogger(UserController.class);
        log.info("Login Request");
        String userID = (String) loginRequest.get("username");
        String password = (String) loginRequest.get("password");
        return userService.login(userID, password);
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
}
