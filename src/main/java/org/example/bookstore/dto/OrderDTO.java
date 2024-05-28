package org.example.bookstore.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.example.bookstore.entity.Order;
import org.example.bookstore.entity.OrderItem;
import org.example.bookstore.utils.MyUtils;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)//如果值为null就不进行传输
public class OrderDTO {
    private Integer orderID;
    private String orderDate;
    private String address;
    private String receiver;
    private String tel;
    private Double totalPrice;
    private String userID;

    private List<OrderItemDTO> orderItemDTOs;

    public OrderDTO() {
    }

    public OrderDTO(Order order) {
        this.orderItemDTOs = new ArrayList<>();
        this.orderID = order.getOrderID();
        this.orderDate = order.getOrderDate().toString();
        this.address = order.getAddress();
        this.receiver = order.getReceiver();
        this.tel = order.getTel();
        this.totalPrice = MyUtils.toRMB(order.getTotalPrice());
        for(OrderItem orderItem : order.getOrderItems()){
            orderItemDTOs.add(new OrderItemDTO(orderItem));
        }
    }
}
