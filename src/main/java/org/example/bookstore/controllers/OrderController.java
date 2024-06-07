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

    @Autowired
    private BookService bookService;

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
        List<CartItem> cartItems = new ArrayList<>();
        for (Integer cartItemId : cartItemIds) {
            CartItem cartItem = cartItemService.findByCartItemId(cartItemId);
            Book book = cartItem.getCartbook();
            if(book.getInventory() < cartItem.getQuantity()){
                return new Response(400, book.getTitle()+"库存不足, "+ "现有库存: " + book.getInventory() + " 请重新下单");
            }
            cartItems.add(cartItem);
        }
        //对应id找到相应的cartItem并放入orderItem中，放入对应的cartItem之后也要将这些cartItem都删除掉，并且对于库存和销量做相应操作
        for(CartItem cartItem : cartItems){
            Book book = cartItem.getCartbook();
            book.setSales(book.getSales() + cartItem.getQuantity());
//            Integer leftQuantity = book.getInventory() - cartItem.getQuantity();
            book.setInventory(book.getInventory() - cartItem.getQuantity());
            bookService.save(book);
            Integer price = book.getPrice() * cartItem.getQuantity();
            totalPrice += price;
            OrderItem orderItem = new OrderItem(cartItem.getQuantity(),price,book.getTitle(), book.getImg(), book,order);
            orderItemService.save(orderItem);
            cartItemService.delete(cartItem);
        }
        order.setTotalPrice(totalPrice);
        orderService.save(order);
        user.setBalance(user.getBalance() - totalPrice);
        userService.save(user);
        return new Response(200, "下单成功");
    }

    @PostMapping("/getPurchaseByDate")
    public Response getPurchasesByDate(@RequestBody Map<String,Object> requestBody) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        log.info(userID + " is getting purchases by date");
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
        Date startDate = Date.valueOf((String) requestBody.get("startDate"));
        Date endDate = Date.valueOf((String) requestBody.get("endDate"));
        //使用map暂存每个order中orderitem对应的书籍，如果对应的书籍已经存在，则将其销量加上对应的数量，如果不存在则将其加入map
        List<Order> orders = orderService.findByUserandDate(user, startDate, endDate);
        return orderService.mapOrderItemsToPurchaseDTOs(orders);
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

    @PostMapping("/getOrdersByTitleandDate")
    public Response getOrdersByTitleandDate(@RequestBody Map<String, Object> requestBody){
        final Logger log = LoggerFactory.getLogger(OrderController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        String title = (String) requestBody.get("title");
        Date startDate = Date.valueOf((String) requestBody.get("startDate"));
        Date endDate = Date.valueOf((String) requestBody.get("endDate"));
//        log.info("title: " + title + " startDate: " + startDate + " endDate: " + endDate);
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
        log.info("page: " + page + " size: " + size);
        return orderService.findByUserandTitleandDate(title, startDate, endDate, user, page, size);
    }

    @PostMapping("statBooksByDate")
    public Response statBooksByDate(@RequestBody Map<String,Object> requestBody){
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        if(userService.findByUserID(userID).getIsAdmin() == false) {
            return new Response(401, "非管理员无法统计书籍销量");
        }
        final Logger log = LoggerFactory.getLogger(BookController.class);
        Date startDate = Date.valueOf((String) requestBody.get("startDate"));
        Date endDate = Date.valueOf((String) requestBody.get("endDate"));
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
        List<Order> orders = orderService.findByDate(startDate, endDate);
        return orderService.getPurchaseDTOswithPageandSize(orders, page, size);
    }

    @PostMapping("/adminGetOrdersByTitleandDate")
    public Response adminGetOrdersByTitleandDate(@RequestBody Map<String, Object> requestBody){
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        if(userService.findByUserID(userID).getIsAdmin() == false) {
            return new Response(401, "非管理员无法查询所有订单");
        }
        final Logger log = LoggerFactory.getLogger(OrderController.class);
        log.info("Admin is querying Orders");
        String title = (String) requestBody.get("title");
        Date startDate = Date.valueOf((String) requestBody.get("startDate"));
        Date endDate = Date.valueOf((String) requestBody.get("endDate"));
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
//        log.info("title: " + title + " startDate: " + startDate + " endDate: " + endDate);
        log.info("page: " + page + " size: " + size);
        return orderService.findByTitleandDate(title, startDate, endDate, page, size);
    }

    @GetMapping("/adminGetAllOrders")
    public List<OrderDTO> adminGetAllOrders(){
        HttpSession session = MyUtils.getSession();
        String adminUserID = (String) session.getAttribute("userID");
        if(userService.findByUserID(adminUserID).getIsAdmin() == false) {
            return null;
        }
        final Logger log = LoggerFactory.getLogger(OrderController.class);
        log.info("Admin is querying Orders");
        //遍历所有user的order
        List<OrderDTO> orders = new ArrayList<>();
        for(User user : userService.findAll()){
            String userID = user.getUserID();
            for(Order order : user.getOrders()){
                OrderDTO orderDTO = new OrderDTO(order);
                orderDTO.setUserID(userID);
                orders.add(orderDTO);
            }
        }
        if(orders.size() > 1) {
            Collections.reverse(orders);
        }
        return orders;
    }


}
