package com.myCart.product_service.service;

import com.myCart.product_service.model.dto.SubCategoryDto;
import com.myCart.product_service.model.entity.SubCategory;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SubCategoryService {

    // Get all sub categories
    List<SubCategoryDto> findAll();

    // Get all sub categories pagination
    Page<SubCategoryDto> findAllSubCategory(int page, int size);

    // Get sub category by id
    SubCategoryDto findById(final Long subCategoryId);

    // Add new sub category
    SubCategoryDto addSubCategory(final SubCategoryDto subCategoryDto);

    // Update sub category
    SubCategoryDto updateSubCategory(final SubCategoryDto subCategoryDto);

    // Update sub category by id
    SubCategoryDto updateSubCategoryById(final Long subCategoryId, final SubCategoryDto subCategoryDto);

    // Delete sub category
    void deleteSubCategoryById(final Long subCategoryId);
}
