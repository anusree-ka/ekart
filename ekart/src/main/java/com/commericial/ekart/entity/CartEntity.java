package com.commericial.ekart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartEntity {

    @Id
    @Column(name = "cart_id")
    @GeneratedValue(generator = "cart_id_seq_gen", strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "cart_id_seq_gen",sequenceName = "cart_id_seq",schema = "ekart", allocationSize = 1, initialValue = 1000)
    private Long cartId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "quantity")
    private Integer quantity;

}
