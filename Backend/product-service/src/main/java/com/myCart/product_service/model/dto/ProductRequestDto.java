package com.myCart.product_service.model.dto;

import com.myCart.product_service.model.entity.Category;
import com.myCart.product_service.model.entity.StockStatus;
import com.myCart.product_service.model.entity.SubCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductRequestDto {

    private Long productId;

    private String productName;

    private String description;

    private String brand;

    private String manufacturer;

    private Double price;

    private Double discountPrice;

    private Integer stockQuantity;

    private StockStatus stockStatus;

    private Long categoryId;

    private Long subCategoryId;

    private String color;

    private String size;

    private String material;

    private Double weight;

    private String productImageUrl;

    private Long sellerId;

}