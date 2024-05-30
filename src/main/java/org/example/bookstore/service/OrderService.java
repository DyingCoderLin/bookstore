package org.example.bookstore.service;

import org.example.bookstore.dto.OrderDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.User;

import java.sql.Date;
import java.util.List;

public interface OrderService {
    public void save(Order order);
    public Response findByUserandTitleandDate(String search, Date startDate, Date endDate, User user, Integer page, Integer size);
    public Response findByTitleandDate(String search, Date startDate, Date endDate,Integer page, Integer size);
}
