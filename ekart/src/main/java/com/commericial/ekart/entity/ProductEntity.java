package com.commericial.ekart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {


    @Id
    @Column(name = "product_id")
    @GeneratedValue(generator = "product_id_seq_gen",strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "product_id_seq_gen", sequenceName = "product_id_seq",schema = "ekart",allocationSize = 1, initialValue = 1000)
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_desc", columnDefinition = "text")
    private String productDescription;

    @Column(name = "product_img_url", columnDefinition = "text")
    private String productImageUrl;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "expected_delivery")
    private LocalDate expectedDelivery;

}
