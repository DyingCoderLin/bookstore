package org.example.bookstore.dto;

import lombok.Data;
import org.example.bookstore.entity.OrderItem;
import org.example.bookstore.utils.MyUtils;

@Data
public class OrderItemDTO {
        private Double price;
        private Integer quantity;
        private String img;
        private String title;

        public OrderItemDTO() {
        }

        public OrderItemDTO(OrderItem orderItem) {
            this.price = MyUtils.toRMB(orderItem.getPrice());
            this.quantity = orderItem.getQuantity();
            this.img = orderItem.getImg();
            this.title = orderItem.getTitle();
        }
}
