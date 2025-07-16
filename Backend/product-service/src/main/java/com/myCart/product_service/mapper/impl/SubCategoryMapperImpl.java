package com.myCart.product_service.mapper.impl;

import com.myCart.product_service.exception.CategoryNotFoundException;
import com.myCart.product_service.mapper.SubCategoryMapper;
import com.myCart.product_service.model.dto.SubCategoryDto;
import com.myCart.product_service.model.entity.Category;
import com.myCart.product_service.model.entity.SubCategory;
import com.myCart.product_service.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SubCategoryMapperImpl implements SubCategoryMapper {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public SubCategory toSubCategory(SubCategoryDto subCategoryDto) {
        Category category = categoryRepository.findById(subCategoryDto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        return SubCategory.builder()
                .subCategoryId(subCategoryDto.getSubCategoryId())
                .subCategoryName(subCategoryDto.getSubCategoryName())
                .category(category)
                .build();
    }


    @Override
    public SubCategoryDto toSubCategoryDto(SubCategory subCategory){
        return SubCategoryDto.builder()
                .subCategoryId(subCategory.getSubCategoryId())
                .subCategoryName(subCategory.getSubCategoryName())
                .categoryId(subCategory.getCategory() != null ? subCategory.getCategory().getCategoryId() : null)
                .build();
    }
}
