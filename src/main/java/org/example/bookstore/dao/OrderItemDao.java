package org.example.bookstore.dao;

import org.example.bookstore.entity.OrderItem;

public interface OrderItemDao {
    public OrderItem save(OrderItem orderItem);
}
