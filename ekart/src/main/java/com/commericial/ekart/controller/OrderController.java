package com.commericial.ekart.controller;

import com.commericial.ekart.kafka.MessageProducer;
import com.commericial.ekart.model.Order;
import com.commericial.ekart.service.OrderService;
import com.commericial.ekart.util.AppConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private MessageProducer messageProducer;


    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<Order>> getAllOrdersForUser(@PathVariable Long userId){

        return new ResponseEntity<>(this.orderService.getAllOrdersForUser(userId), HttpStatus.OK);
    }

    @PostMapping("/order")
    public ResponseEntity placeOrder(@RequestBody Order order){

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            this.messageProducer.sendOrderDetails(AppConstants.KAFKA_ORDER_TOPIC,objectMapper.writeValueAsString(order));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity updateDeliveryStatus(@PathVariable Long orderId, @RequestParam String deliveryStatus){

        this.orderService.updateDeliveryStatus(orderId,deliveryStatus);
        return new ResponseEntity(HttpStatus.OK);
    }
}
