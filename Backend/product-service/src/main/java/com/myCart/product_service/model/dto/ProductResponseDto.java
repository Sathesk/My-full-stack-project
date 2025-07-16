package com.myCart.product_service.model.dto;

import com.myCart.product_service.model.entity.Category;
import com.myCart.product_service.model.entity.StockStatus;
import com.myCart.product_service.model.entity.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductResponseDto {

    private Long productId;
    private String productName;
    private String description;
    private String brand;
    private String manufacturer;
    private Double price;
    private Double discountPrice;
    private Integer stockQuantity;
    private StockStatus stockStatus;

    private CategoryDto category;
    private SubCategoryDto subCategory;

    private String color;
    private String size;
    private String material;
    private Double weight;
    private String productImageUrl;
    private Long sellerId;
}
