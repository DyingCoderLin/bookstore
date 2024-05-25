package org.example.bookstore.serviceImpl;

import org.example.bookstore.dao.OrderDao;
import org.example.bookstore.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;

    @Override
    public void save(Order order) {
        orderDao.save(order);
    }
}
