package com.myCart.product_service.mapper;

import com.myCart.product_service.model.dto.SubCategoryDto;
import com.myCart.product_service.model.entity.SubCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubCategoryMapper {
    // DTO to Entity
    SubCategory toSubCategory(SubCategoryDto subCategoryDto);
    // Entity to DTO
    SubCategoryDto toSubCategoryDto(SubCategory subCategory);
}
