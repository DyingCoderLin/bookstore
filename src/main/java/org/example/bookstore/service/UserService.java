package org.example.bookstore.service;

import org.example.bookstore.entity.*;
import org.example.bookstore.dto.*;

public interface UserService {

    public User findByUserID(String userID);

    public Response login(String userID, String password);

    public Response register(String userID, String password);
}
