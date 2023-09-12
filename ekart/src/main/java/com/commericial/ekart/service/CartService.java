package com.commericial.ekart.service;

import com.commericial.ekart.entity.CartEntity;
import com.commericial.ekart.model.Cart;
import com.commericial.ekart.model.Product;
import com.commericial.ekart.repo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductService productService;

    public List<Cart> getCartForUser(Long userId) {

        List<Cart> carts = new ArrayList<>();

        List<CartEntity> cartEntities = this.cartRepo.findByUserId(userId);

        List<Long> productIds = cartEntities.stream().map(CartEntity::getProductId).toList();

        List<Product> products = this.productService.getProductsByIds(productIds);

        Map<Long, Product> productMap = products.stream().collect(Collectors.toMap(Product::getProductId, Function.identity()));

        cartEntities.forEach(cartEntity -> {
            Cart cart = Cart.builder().cartId(cartEntity.getCartId()).userId(cartEntity.getUserId()).quantity(cartEntity.getQuantity()).product(productMap.get(cartEntity.getProductId())).build();

            carts.add(cart);
        });
        return carts;
    }

    public void addItemToCart(Cart cart) {

        CartEntity cartEntity = this.cartRepo.findByProductIdAndUserId(cart.getProduct().getProductId(), cart.getUserId());
        if(Objects.nonNull(cartEntity)){
            cartEntity.setQuantity(cartEntity.getQuantity()+ cart.getQuantity());
        }
        else{
            cartEntity = CartEntity.builder().productId(cart.getProduct().getProductId()).quantity(cart.getQuantity()).userId(cart.getUserId()).build();

        }


        this.cartRepo.save(cartEntity);

    }

    public void modifyCartItemQuantity(Long cartId, Integer quantity) {

        CartEntity cartEntity = this.cartRepo.findById(cartId).get();

        cartEntity.setQuantity(quantity);
        this.cartRepo.save(cartEntity);
    }

    public void removeItemFromCart(Long cartId) {

        this.cartRepo.deleteById(cartId);

    }
}
