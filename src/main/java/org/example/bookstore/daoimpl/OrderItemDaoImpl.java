package org.example.bookstore.daoimpl;

import org.example.bookstore.entity.OrderItem;
import org.example.bookstore.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.example.bookstore.dao.OrderItemDao;

@Repository
public class OrderItemDaoImpl implements OrderItemDao{
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}
