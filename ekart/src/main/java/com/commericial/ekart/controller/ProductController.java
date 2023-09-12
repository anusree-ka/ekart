package com.commericial.ekart.controller;

import com.commericial.ekart.model.Product;
import com.commericial.ekart.service.ProductService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String searchParam) {

        return new ResponseEntity<>(this.productService.getAllProducts(searchParam), HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {

        return new ResponseEntity<>(this.productService.getProductById(productId), HttpStatus.OK);
    }

    @PostMapping("/products")
    public ResponseEntity addProduct(@RequestBody Product product) {

        this.productService.addProduct(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
