package org.example.bookstore.daoimpl;

import org.example.bookstore.dao.OrderDao;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.User;
import org.example.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public Order save(Order order) {
//        int result = 10/0;
        return orderRepository.save(order);
    }

    public Page<Order> findOrdersByOrderItemTitleAndDateBetween(String searchText, Date startDate, Date endDate, Pageable pageable){
        return orderRepository.findOrdersByOrderItemTitleAndDateBetween(searchText, startDate, endDate, pageable);
    }

    public Page<Order> findOrdersByOrderItemTitleAndUserIdAndDateBetween(String searchText, Date startDate, Date endDate, String userId, Pageable pageable){
        return orderRepository.findOrdersByOrderItemTitleAndUserIdAndDateBetween(searchText, startDate, endDate, userId, pageable);
    }

    public int countByOrderItemTitleAndUserIdAndDateBetween(String search, Date startDate, Date endDate, String userId){
        return (int)orderRepository.countOrdersByOrderItemTitleAndUserIdAndDateBetween(search, startDate, endDate, userId);
    }

    public int countByOrderItemTitleAndDateBetween(String search, Date startDate, Date endDate){
        return (int)orderRepository.countOrdersByOrderItemTitleAndDateBetween(search, startDate, endDate);
    }

    public List<Order> findByUserIdAndDateBetween(Date startDate, Date endDate, String userId){
        return orderRepository.findByUserIdAndDateBetween(startDate, endDate, userId);
    }

    public List<Order> findByDateBetween(Date startDate, Date endDate){
        return orderRepository.findByDateBetween(startDate, endDate);
    }
}
