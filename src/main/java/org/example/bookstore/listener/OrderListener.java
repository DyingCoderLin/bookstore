package org.example.bookstore.listener;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.example.bookstore.entity.Order;
import org.example.bookstore.service.OrderService;
import org.example.bookstore.websocket.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;

import java.util.Map;


@Component
public class OrderListener {

    @Autowired
    private OrderService OrderService; // 注入KafkaOrderService

    @Autowired
    KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebSocketServer ws;

    // 监听订单消息
    @KafkaListener(topics = "orders", groupId = "order_group")
    public void listenOrder(ConsumerRecord<String, String> record,Acknowledgment ack){
        try {
            // 获取消息内容
            String message = record.value();
            // 将接收到的 JSON 字符串转换为 Map
            Map<String, Object> orderInfo = objectMapper.readValue(message, Map.class);
            System.out.println("Received order message: " + orderInfo);

            OrderService.placeOrder(orderInfo);

            // 因为properties里配置为false，所以手动提交消息
            ack.acknowledge();
        } catch (Exception e) {
            e.printStackTrace(); // 处理异常
        }
    }

    @KafkaListener(topics = "responseorder", groupId = "order_group")
    public void listenResponseOrder(ConsumerRecord<String, String> record,Acknowledgment ack){
        try {
            // 获取消息内容
            System.out.println("Received response order message: " + record.value());
            String message = record.value();
            // 从消息中取出userID并将这一段截去
            // 将接收到的 JSON 字符串转换为 Map
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> messageMap = objectMapper.readValue(message, new TypeReference<Map<String, Object>>(){});

            // 从消息中取出userID
            String userID = (String) messageMap.remove("userID");

            // 将剩余的 JSON 字符串发送给管理员
            String modifiedMessage = objectMapper.writeValueAsString(messageMap);
            ws.sendMessageToUser(userID, modifiedMessage);

            // 因为properties里配置为false，所以手动提交消息
            ack.acknowledge();
        } catch (Exception e) {
            e.printStackTrace(); // 处理异常
        }
    }
}

