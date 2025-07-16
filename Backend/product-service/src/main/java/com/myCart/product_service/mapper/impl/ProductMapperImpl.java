package com.myCart.product_service.mapper.impl;

import com.myCart.product_service.exception.CategoryNotFoundException;
import com.myCart.product_service.exception.SubCategoryNotFoundException;
import com.myCart.product_service.mapper.ProductMapper;
import com.myCart.product_service.model.dto.*;
import com.myCart.product_service.model.entity.Category;
import com.myCart.product_service.model.entity.Product;
import com.myCart.product_service.model.entity.SubCategory;
import com.myCart.product_service.repository.CategoryRepository;
import com.myCart.product_service.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductMapperImpl implements ProductMapper {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Override
    public Product toProduct(ProductRequestDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + dto.getCategoryId()));

        SubCategory subCategory = subCategoryRepository.findById(dto.getSubCategoryId())
                .orElseThrow(() -> new SubCategoryNotFoundException("SubCategory not found with id: " + dto.getSubCategoryId()));

        return Product.builder()
                .productId(dto.getProductId())
                .productName(dto.getProductName())
                .description(dto.getDescription())
                .brand(dto.getBrand())
                .manufacturer(dto.getManufacturer())
                .price(dto.getPrice())
                .discountPrice(dto.getDiscountPrice())
                .stockQuantity(dto.getStockQuantity())
                .stockStatus(dto.getStockStatus())
                .category(category)
                .subCategory(subCategory)
                .color(dto.getColor())
                .size(dto.getSize())
                .material(dto.getMaterial())
                .weight(dto.getWeight())
                .productImageUrl(dto.getProductImageUrl())
                .sellerId(dto.getSellerId())
                .build();
    }

    @Override
    public ProductResponseDto toProductResponseDto(Product product) {
        Category category = product.getCategory();
        SubCategory subCategory = product.getSubCategory();

        CategoryDto categoryDto = category != null
                ? CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .build()
                : null;

        SubCategoryDto subCategoryDto = subCategory != null
                ? SubCategoryDto.builder()
                .subCategoryId(subCategory.getSubCategoryId())
                .subCategoryName(subCategory.getSubCategoryName())
                .categoryId(category != null ? category.getCategoryId() : null)
                .build()
                : null;

        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .productName(product.getProductName())
                .description(product.getDescription())
                .brand(product.getBrand())
                .manufacturer(product.getManufacturer())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .stockQuantity(product.getStockQuantity())
                .stockStatus(product.getStockStatus())
                .color(product.getColor())
                .size(product.getSize())
                .material(product.getMaterial())
                .weight(product.getWeight())
                .productImageUrl(product.getProductImageUrl())
                .sellerId(product.getSellerId())
                .category(categoryDto)
                .subCategory(subCategoryDto)
                .build();
    }
}
