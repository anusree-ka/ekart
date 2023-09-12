package com.commericial.ekart.repo;

import com.commericial.ekart.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepo extends JpaRepository<ProductEntity,Long> {

    @Query("select p from ProductEntity p where lower(productName) like :searchParam or lower(productDescription) like :searchParam")
    List<ProductEntity> searchProducts(String searchParam);
}
