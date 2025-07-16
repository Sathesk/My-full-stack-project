package com.myCart.product_service.mapper.impl;

import com.myCart.product_service.mapper.CategoryMapper;
import com.myCart.product_service.model.dto.CategoryDto;
import com.myCart.product_service.model.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapperImpl implements CategoryMapper{

    @Override
    public  CategoryDto toCategoryDto(Category category){
        return CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .build();
    }

    @Override
    public Category toCategory(CategoryDto categoryDto){
        return Category.builder()
                .categoryName(categoryDto.getCategoryName())
                .build();
    }
}
