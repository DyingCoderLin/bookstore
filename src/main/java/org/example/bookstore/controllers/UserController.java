package org.example.bookstore.controllers;

import org.example.bookstore.model.*;
import org.example.bookstore.service.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
