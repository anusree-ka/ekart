package com.commericial.ekart.service;

import com.commericial.ekart.entity.OrderEntity;
import com.commericial.ekart.exception.BadRequestException;
import com.commericial.ekart.model.Order;
import com.commericial.ekart.model.Product;
import com.commericial.ekart.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductService productService;


    public List<Order> getAllOrdersForUser(Long userId) {

        List<Order> orders = new ArrayList<>();
        List<OrderEntity> orderEntities = this.orderRepo.findByUserIdOrderByOrderIdDesc(userId);

        List<Long> productIds = orderEntities.stream().map(OrderEntity::getProductId).toList();

        Map<Long, Product> productMap = this.productService.getProductsByIds(productIds).stream().collect(Collectors.toMap(Product::getProductId, Function.identity()));

        orderEntities.forEach(orderEntity -> {
            Order order = Order.builder().orderId(orderEntity.getOrderId()).product(productMap.get(orderEntity.getProductId())).quantity(orderEntity.getQuantity()).orderAmount(orderEntity.getOrderAmount()).userId(orderEntity.getUserId()).paymentMode(orderEntity.getPaymentMode()).deliveryStatus(orderEntity.getDeliveryStatus()).orderDate(orderEntity.getOrderDate()).deliveredDate(orderEntity.getDeliveredDate()).build();
            orders.add(order);

        });

        return orders;
    }

    public void updateDeliveryStatus(Long orderId, String deliveryStatus){

        OrderEntity orderEntity = this.orderRepo.findById(orderId).get();
        orderEntity.setDeliveryStatus(deliveryStatus);
        if("DELIVERED".equalsIgnoreCase(deliveryStatus))
            orderEntity.setDeliveredDate(LocalDate.now());

        this.orderRepo.save(orderEntity);
    }

    public void placeOrder(Order order){

        Product product = this.productService.getProductById(order.getProduct().getProductId());

        if(product.getStock()>order.getQuantity()){
            OrderEntity orderEntity = OrderEntity.builder().productId(order.getProduct().getProductId())
                    .quantity(order.getQuantity()).orderAmount(order.getOrderAmount()).paymentMode(order.getPaymentMode())
                    .userId(order.getUserId()).orderDate(LocalDate.now()).deliveryStatus("NOT DELIVERED").build();

            this.orderRepo.save(orderEntity);
        }




    }
}
