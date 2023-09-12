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
public class Product {

    private Long productId;

    private String productName;

    private String productDescription;

    private String productImageUrl;

    private Double rating;

    private Integer productPrice;

    private Integer stock;

    private LocalDate expectedDelivery;
}
