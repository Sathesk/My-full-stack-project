package com.myCart.product_service.repository;

import com.myCart.product_service.model.dto.ProductResponseDto;
import com.myCart.product_service.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory_CategoryId(Long categoryId);
    List<Product> findBySellerId(Long sellerId);
    List<Product> findByProductNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String titleKeyword, String descriptionKeyword);


}
