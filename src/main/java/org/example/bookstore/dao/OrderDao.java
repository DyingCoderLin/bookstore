package org.example.bookstore.dao;

import org.example.bookstore.entity.Order;

public interface OrderDao {
    Order save(Order order);
}
