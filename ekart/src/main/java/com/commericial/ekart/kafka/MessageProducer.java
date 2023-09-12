package com.commericial.ekart.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    public void sendOrderDetails(String topic, String orderDetails){
        kafkaTemplate.send(topic,orderDetails);
    }

}
