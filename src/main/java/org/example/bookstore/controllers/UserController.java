package org.example.bookstore.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.service.*;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.dto.*;

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
        return userService.register(userID, password);
    }

}
