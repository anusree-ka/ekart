package com.commericial.ekart.repo;

import com.commericial.ekart.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<OrderEntity,Long> {


    List<OrderEntity> findByUserIdOrderByOrderIdDesc(Long userId);
}
