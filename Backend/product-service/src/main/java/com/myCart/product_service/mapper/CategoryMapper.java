package com.myCart.product_service.mapper;

import com.myCart.product_service.model.dto.CategoryDto;
import com.myCart.product_service.model.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    // Entity to DTO
    CategoryDto toCategoryDto(Category category);

    // DTO to Entity
    Category toCategory(CategoryDto categoryDto);
}
