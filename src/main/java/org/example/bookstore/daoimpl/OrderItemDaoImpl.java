package org.example.bookstore.daoimpl;

import org.example.bookstore.entity.OrderItem;
import org.example.bookstore.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.example.bookstore.dao.OrderItemDao;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class OrderItemDaoImpl implements OrderItemDao{
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public OrderItem save(OrderItem orderItem) {
//        int result = 10/0;
        return orderItemRepository.save(orderItem);
    }
}
