package org.example.bookstore.serviceImpl;

import org.example.bookstore.dao.OrderItemDao;
import org.example.bookstore.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService{
    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public void save(OrderItem orderItem) {
        orderItemDao.save(orderItem);
    }
}

