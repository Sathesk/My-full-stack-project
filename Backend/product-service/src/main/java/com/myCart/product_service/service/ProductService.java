package com.myCart.product_service.service;

import com.myCart.product_service.model.dto.ProductRequestDto;
import com.myCart.product_service.model.dto.ProductResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<ProductResponseDto> findAll();
    List<ProductResponseDto> findBySellerId(Long sellerId);
    Page<ProductResponseDto> findAllProducts(int page, int size);
    ProductResponseDto findById(Long productId);
    ProductResponseDto updateProduct(ProductRequestDto productRequestDto);
    ProductResponseDto updateProductById(Long productId, ProductRequestDto productRequestDto);
    ProductResponseDto addProduct(ProductRequestDto productRequestDto);
    void deleteProduct(Long productId);
}
