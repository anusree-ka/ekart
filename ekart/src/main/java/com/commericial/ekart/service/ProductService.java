package com.commericial.ekart.service;

import com.commericial.ekart.entity.ProductEntity;
import com.commericial.ekart.model.Product;
import com.commericial.ekart.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts(String searchParam) {

        List<ProductEntity> productEntities = ObjectUtils.isEmpty(searchParam) ? this.productRepo.findAll() : this.productRepo.searchProducts('%' + searchParam.toLowerCase() + '%');
        return this.modelMapper(productEntities);

    }

    public List<Product> getProductsByIds(List<Long> productIds) {

        return this.modelMapper(this.productRepo.findAllById(productIds));
    }

    private List<Product> modelMapper(List<ProductEntity> productEntities) {

        List<Product> products = new ArrayList<>();

        productEntities.forEach(productEntity -> {
            Product product = Product.builder().productId(productEntity.getProductId()).productName(productEntity.getProductName()).productDescription(productEntity.getProductDescription()).productImageUrl(productEntity.getProductImageUrl()).productPrice(productEntity.getProductPrice()).rating(productEntity.getRating()).stock(productEntity.getStock()).expectedDelivery(productEntity.getExpectedDelivery()).build();

            products.add(product);
        });

        return products;
    }

    public void addProduct(Product product) {

        ProductEntity productEntity = ProductEntity.builder().productName(product.getProductName()).productDescription(product.getProductDescription()).productImageUrl(product.getProductImageUrl()).productPrice(product.getProductPrice()).rating(product.getRating()).stock(product.getStock()).expectedDelivery(product.getExpectedDelivery()).build();
        this.productRepo.save(productEntity);
    }

    public Product getProductById(Long productId) {

        ProductEntity productEntity = this.productRepo.findById(productId).get();

        return Product.builder().productId(productEntity.getProductId()).productName(productEntity.getProductName()).productDescription(productEntity.getProductDescription()).productImageUrl(productEntity.getProductImageUrl()).productPrice(productEntity.getProductPrice()).rating(productEntity.getRating()).stock(productEntity.getStock()).expectedDelivery(productEntity.getExpectedDelivery()).build();

    }
}
