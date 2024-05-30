package org.example.bookstore.utils;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.dto.OrderDTO;
import org.example.bookstore.dto.PurchaseDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.OrderItem;
import org.example.bookstore.entity.User;
import org.springframework.data.relational.core.sql.In;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class MyUtils {
    public static void setSession(String userID) {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (servletRequestAttributes != null) {
            HttpServletRequest request = servletRequestAttributes.getRequest();
            HttpSession session = request.getSession();
//            System.out.println("set Session ID: " + session.getId());
            session.setAttribute("userID", userID);
        }
    }

    public static HttpSession getSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            return request.getSession(false);
        }
        return null;
    }

    public static Double toRMB(Integer price) {
        return price / 100.0;
    }

    public static Integer toCent(String price) {
        return (int) (Double.parseDouble(price) * 100);
    }

    public static Integer toCent(Double price) {
        price = price * 100;
        return price.intValue();
    }

    public static List<OrderDTO> getWithinDate(List<Order> orders, Date startDate, Date endDate) {
        List<OrderDTO> orderDTOs = new ArrayList<>();
        if(!startDate.equals(Date.valueOf("1970-01-01")) && !endDate.equals(Date.valueOf("1970-01-01"))) {
            for (Order order : orders) {
                if (!order.getOrderDate().before(startDate) && !order.getOrderDate().after(endDate)) {
                    orderDTOs.add(new OrderDTO(order));
                }
            }
        }
        else if(startDate.equals(Date.valueOf("1970-01-01")) && !endDate.equals(Date.valueOf("1970-01-01"))){
            for (Order order : orders) {
                if (!order.getOrderDate().after(endDate)) {
                    orderDTOs.add(new OrderDTO(order));
                }
            }
        }
        else if(!startDate.equals(Date.valueOf("1970-01-01")) && endDate.equals(Date.valueOf("1970-01-01"))){
            for (Order order : orders) {
                if (!order.getOrderDate().before(startDate)) {
                    orderDTOs.add(new OrderDTO(order));
                }
            }
        }
        else{
            for (Order order : orders) {
                orderDTOs.add(new OrderDTO(order));
            }
        }
        return orderDTOs;
    }

    public static Integer countTotalOrders(List<Order> orders, Date startDate, Date endDate) {
        List<OrderDTO> orderDTOs = getWithinDate(orders, startDate, endDate);
        return (int)orderDTOs.size();
    }
}
