package com.commericial.ekart.controller;

import com.commericial.ekart.model.Cart;
import com.commericial.ekart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("cart/{userId}")
    public ResponseEntity<List<Cart>> getCartForUser(@PathVariable Long userId){

        return new ResponseEntity<>(this.cartService.getCartForUser(userId), HttpStatus.OK);
    }

    @PostMapping("cart")
    public ResponseEntity addItemToCart(@RequestBody Cart cart){

        this.cartService.addItemToCart(cart);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("cart/{cartId}")
    public ResponseEntity modifyCart(@PathVariable Long cartId, @RequestParam Integer quantity){

        this.cartService.modifyCartItemQuantity(cartId,quantity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("cart/{cartId}")
    public ResponseEntity removeItemFromCart(@PathVariable Long cartId){

        this.cartService.removeItemFromCart(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
