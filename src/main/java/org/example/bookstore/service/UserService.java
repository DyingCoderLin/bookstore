package org.example.bookstore.service;

import org.example.bookstore.entity.*;
import org.example.bookstore.dto.*;

import java.util.List;

public interface UserService {

    public User findByUserID(String userID);

    public Response login(String userID, String password);

    public Response register(String userID, String password,String email);

    public void save(User user);

    public List<User> findAll();
}
