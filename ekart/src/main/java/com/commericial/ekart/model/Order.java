package com.commericial.ekart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    private Long orderId;

    private Product product;

    private Long userId;

    private Long quantity;

    private Integer orderAmount;

    private String paymentMode;

    private String deliveryStatus;

    private LocalDate orderDate;

    private LocalDate deliveredDate;
}
