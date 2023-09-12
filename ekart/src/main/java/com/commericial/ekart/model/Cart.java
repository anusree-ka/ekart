package com.commericial.ekart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    private Long cartId;

    private Product product;

    private Long userId;

    private Integer quantity;

}
