package com.commericial.ekart.kafka;

import com.commericial.ekart.model.Order;
import com.commericial.ekart.service.OrderService;
import com.commericial.ekart.util.AppConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MessageConsumer {

    @Autowired
    private OrderService orderService;

    @KafkaListener(topics = AppConstants.KAFKA_ORDER_TOPIC, groupId = AppConstants.KAFKA_GROUP_ID)
    public void listen(String orderDetails) {

        ObjectMapper mapper = new ObjectMapper();
        try {
            Order order = mapper.readValue(orderDetails, Order.class);
            this.orderService.placeOrder(order);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
