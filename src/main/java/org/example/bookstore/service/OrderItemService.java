package org.example.bookstore.service;

import org.example.bookstore.repository.OrderItemRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

}
