package com.commericial.ekart.repo;

import com.commericial.ekart.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepo extends JpaRepository<CartEntity,Long> {
    List<CartEntity> findByUserId(Long userId);
    CartEntity findByProductIdAndUserId(Long productId, Long userId);
}
