package org.example.bookstore.dao;

import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.sql.Date;
import java.util.List;

public interface OrderDao {
    Order save(Order order);
    Page<Order> findOrdersByOrderItemTitleAndDateBetween(String searchText, Date startDate, Date endDate, Pageable pageable);
    Page<Order> findOrdersByOrderItemTitleAndUserIdAndDateBetween(String searchText, Date startDate, Date endDate, String userId, Pageable pageable);
    int countByOrderItemTitleAndUserIdAndDateBetween(String search, Date startDate, Date endDate, String userId);
    int countByOrderItemTitleAndDateBetween(String search, Date startDate, Date endDate);
    List<Order> findByUserIdAndDateBetween(Date startDate, Date endDate, String userId);
    List<Order> findByDateBetween(Date startDate, Date endDate);
}
