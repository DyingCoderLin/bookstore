package org.example.bookstore.service;

import org.aspectj.weaver.ast.Or;
import org.example.bookstore.dto.OrderDTO;
import org.example.bookstore.dto.PurchaseDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.User;

import java.sql.Date;
import java.util.List;
import java.util.Map;

public interface OrderService {
    public Response findByUserandTitleandDate(String search, Date startDate, Date endDate, User user, Integer page, Integer size);
    public Response findByTitleandDate(String search, Date startDate, Date endDate,Integer page, Integer size);
    public List<Order> findByUserandDate(User user, Date startDate, Date endDate);
    public Response mapOrderItemsToPurchaseDTOs(List<Order> orders);
    public List<Order> findByDate(Date startDate, Date endDate);
    public Response getPurchaseDTOswithPageandSize(List<Order> orders, Integer page, Integer size);
    public void placeOrder(Map<String,Object> orderInfo);
}
