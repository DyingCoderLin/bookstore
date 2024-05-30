package org.example.bookstore.serviceImpl;

import org.example.bookstore.controllers.OrderController;
import org.example.bookstore.dao.OrderDao;
import org.example.bookstore.dto.BookDTO;
import org.example.bookstore.dto.OrderDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.entity.Book;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.User;
import org.example.bookstore.repository.OrderRepository;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.OrderService;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void save(Order order) {
        orderDao.save(order);
    }
    public Response findByUserandTitleandDate(String search, Date startDate, Date endDate, User user,Integer page, Integer size){
        class Data {
            public List<OrderDTO> orderDTOs;
            public int size;

            public Data(List<OrderDTO> orderDTOs, int size) {
                this.orderDTOs = orderDTOs;
                this.size = size;
            }
        }
        if(endDate.equals(Date.valueOf("1970-01-01"))){
            endDate = Date.valueOf("2100-01-01");
        }
        Logger log = org.slf4j.LoggerFactory.getLogger(OrderServiceImpl.class);
        log.info("size" + size.toString());
        Pageable pageRequest = PageRequest.of(page - 1, size);
//        Page<Order> orderPage = orderDao.findByUserandTitle(search, user, pageRequest);

        Page<Order> orderPage = orderDao.findOrdersByOrderItemTitleAndUserIdAndDateBetween(search, startDate, endDate, user.getUserID(), pageRequest);
        List<OrderDTO> orderDTOs = orderPage.getContent().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
//        List<OrderDTO> orderDTOs = MyUtils.getWithinDate(orders, startDate, endDate);
        log.info("to here 0");
//        int mySize = MyUtils.countTotalOrders(orderDao.findAllByTitleAndUserId(search, user.getUserID()), startDate, endDate);
        Data data = new Data(orderDTOs, orderDao.countByOrderItemTitleAndUserIdAndDateBetween(search, startDate, endDate, user.getUserID()));
        return new Response(200, "", data);
    }

    public Response findByTitleandDate(String title,Date startDate, Date endDate,Integer page, Integer size){
        Logger log = org.slf4j.LoggerFactory.getLogger(OrderServiceImpl.class);
        Pageable pageRequest = PageRequest.of(page - 1, size);
        if(endDate.equals(Date.valueOf("1970-01-01"))){
            endDate = Date.valueOf("2100-01-01");
        }
        log.info("size" + size.toString());
//        Page<Order> orderPage = orderDao.findByTitle(title, pageRequest);
        Page<Order> orderPage = orderDao.findOrdersByOrderItemTitleAndDateBetween(title, startDate, endDate, pageRequest);
        class Data {
            public List<OrderDTO> orderDTOs;
            public int size;

            public Data(List<OrderDTO> orderDTOs, int size) {
                this.orderDTOs = orderDTOs;
                this.size = size;
            }
        }
        List<OrderDTO> orderDTOs = orderPage.getContent().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
//        List<OrderDTO> orderDTOs = MyUtils.getWithinDate(orders, startDate, endDate);
        //只有startDate和endDate不为1970-01-01时,才进行时间筛选
        log.info("to here 0");
//        int mySize = MyUtils.countTotalOrders(orderDao.findAllbyTitle(title), startDate, endDate);
        int mySize = orderDao.countByOrderItemTitleAndDateBetween(title, startDate, endDate);
        return new Response(200, "", new Data(orderDTOs, mySize));
    }
}
