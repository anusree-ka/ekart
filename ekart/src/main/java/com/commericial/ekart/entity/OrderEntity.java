package com.commericial.ekart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @Column(name = "order_id")
    @GeneratedValue(generator = "order_id_seq_gen", strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "order_id_seq_gen", sequenceName = "order_id_seq",schema = "ekart", allocationSize = 1, initialValue = 1000)
    private Long orderId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "order_amount")
    private Integer orderAmount;

    @Column(name = "payment_mode")
    private String paymentMode;

    @Column(name = "delivery_status")
    private String deliveryStatus;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "delivered_date")
    private LocalDate deliveredDate;

}
