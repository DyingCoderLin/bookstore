package org.example.bookstore.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.service.*;
import org.example.bookstore.entity.*;
import org.example.bookstore.dto.*;

import java.sql.Date;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api") // 指定父路径为/api
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/placeOrder")
    public Response placeOrder(@RequestBody Map<String, Object> orderInfo){
        final Logger log = LoggerFactory.getLogger(OrderController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        String address = (String) orderInfo.get("address");
        String receiver = (String) orderInfo.get("receiver");
        String tel = (String) orderInfo.get("tel");
        List<Integer> cartItemIds = (List<Integer>) orderInfo.get("cartItemIds");
        Date orderDate = new Date(System.currentTimeMillis());
        Order order = new Order(address, receiver, tel, 0, orderDate, user);
        log.info("to here0");
        orderService.save(order);
        log.info("to here1");
        int totalPrice = 0;
        CartItem cartItem = null;
        //对应id找到相应的cartItem并放入orderItem中，放入对应的cartItem之后也要将这些cartItem都删除掉
        for(Integer cartItemId : cartItemIds){
            cartItem = cartItemService.findByCartItemId(cartItemId);
            totalPrice += cartItem.getPrice();
            OrderItem orderItem = new OrderItem(cartItem.getQuantity(),cartItem.getPrice(),cartItem.getTitle(),cartItem.getImg(),cartItem.getBook(),order);
            cartItemService.delete(cartItem);
            orderItemService.save(orderItem);
        }
        order.setTotalPrice(totalPrice);
        orderService.save(order);
        return new Response(200, "下单成功");
    }

    @GetMapping("/getAllOrders")
    public List<OrderDTO> getAllOrders(){
        final Logger log = LoggerFactory.getLogger(OrderController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        log.info(userID + " is querying Orders");
        User user = userService.findByUserID(userID);
        List<OrderDTO> orders = new ArrayList<>();
        //我想要从尾到头遍历user.getOrders()，但是不知道怎么做
        for(Order order : user.getOrders()){
            log.info("orderID: " + order.getOrderID());
            OrderDTO orderDTO = new OrderDTO(order);
            orders.add(orderDTO);
        }
        if(orders.size() > 1) {
            Collections.reverse(orders);
        }
        return orders;
    }


}
