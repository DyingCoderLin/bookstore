package org.example.bookstore.serviceImpl;

import org.example.bookstore.controllers.OrderController;
import org.example.bookstore.dao.OrderDao;
import org.example.bookstore.dto.BookDTO;
import org.example.bookstore.dto.OrderDTO;
import org.example.bookstore.dto.PurchaseDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.entity.Book;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.OrderItem;
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
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.*;
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
                .sorted(Comparator.comparing(OrderDTO::getOrderDate).reversed()) // 根据订单日期降序排序
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

    //复制找到该user旗下所有符合要求的order
    public List<Order> findByUserandDate(User user, Date startDate, Date endDate){
        Logger log = org.slf4j.LoggerFactory.getLogger(OrderServiceImpl.class);
        List<Order> orders = orderDao.findByUserIdAndDateBetween(startDate, endDate, user.getUserID());
        return orders;
    }

    public Response mapOrderItemsToPurchaseDTOs(List<Order> orders) {
        Map<Integer, PurchaseDTO> purchaseMap = new HashMap<>();
        int totalPrice = 0;
        int totalBooks = 0;
        for (Order order : orders) {
            for (OrderItem orderItem : order.getOrderItems()) {
                int bookID = orderItem.getBook().getBookID();
                PurchaseDTO purchaseDTO = purchaseMap.getOrDefault(bookID, new PurchaseDTO(orderItem.getBook()));

                totalPrice += orderItem.getPrice();
                totalBooks += orderItem.getQuantity();
                purchaseDTO.setQuantity(purchaseDTO.getQuantity() + orderItem.getQuantity());
//                purchaseDTO.setPrice(purchaseDTO.getPrice() + MyUtils.toRMB(orderItem.getPrice()));
                purchaseDTO.addPrice(orderItem.getPrice());
                purchaseMap.put(bookID, purchaseDTO);
            }
        }
        class Data {
            private List<PurchaseDTO> purchaseDTOs;
            private double totalPrice;
            private int totalBooks;

            public Data(List<PurchaseDTO> purchaseDTOs, double totalPrice, int totalBooks) {
                this.purchaseDTOs = purchaseDTOs;
                this.totalPrice = totalPrice;
                this.totalBooks = totalBooks;
            }

            public List<PurchaseDTO> getPurchaseDTOs() {
                return purchaseDTOs;
            }
            public double getTotalPrice() {
                return totalPrice;
            }
            public int getTotalBooks() {
                return totalBooks;
            }
        }
        //将书籍按照purchaseDTO的quantity排序
        List<PurchaseDTO> purchaseDTOs = new ArrayList<>(purchaseMap.values());
        purchaseDTOs.sort((a, b) -> b.getQuantity() - a.getQuantity());
        return new Response<Data>(200, "", new Data(purchaseDTOs, MyUtils.toRMB(totalPrice), totalBooks));
    }

    public List<Order> findByDate(Date startDate, Date endDate){
        return orderDao.findByDateBetween(startDate, endDate);
    }

    public Response getPurchaseDTOswithPageandSize(List<Order> orders, Integer page, Integer size){
        Logger log = org.slf4j.LoggerFactory.getLogger(OrderServiceImpl.class);
        Map<Integer, PurchaseDTO> purchaseMap = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem orderItem : order.getOrderItems()) {
                int bookID = orderItem.getBook().getBookID();
                PurchaseDTO purchaseDTO = purchaseMap.getOrDefault(bookID, new PurchaseDTO(orderItem.getBook()));

                purchaseDTO.setQuantity(purchaseDTO.getQuantity() + orderItem.getQuantity());
                purchaseDTO.setPrice(purchaseDTO.getPrice() + orderItem.getPrice());
                purchaseMap.put(bookID, purchaseDTO);
            }
        }
        List<PurchaseDTO> purchaseDTOs = new ArrayList<>(purchaseMap.values());
        purchaseDTOs.sort((a, b) -> b.getQuantity() - a.getQuantity());
        //从前到后找到第page页的size个元素，注意第一页的page是1
        int total = purchaseDTOs.size();
        int start = (page - 1) * size;
        int end = Math.min(start + size, total);
        log.info("start: " + start + " end: " + end + " total: " + total);
        if(start > end) {
            return new Response(400, "");
        }
        class Data {
            private List<PurchaseDTO> purchaseDTOs;
            private int total;

            public Data(List<PurchaseDTO> purchaseDTOs, int total) {
                this.purchaseDTOs = purchaseDTOs;
                this.total = total;
            }

            public List<PurchaseDTO> getPurchaseDTOs() {
                return purchaseDTOs;
            }
            public int getTotal() {
                return total;
            }
        }
        return new Response<>(200, "", new Data(purchaseDTOs.subList(start, end), total));
    }
}
