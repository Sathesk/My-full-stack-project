package com.myCart.product_service.service;

import com.myCart.product_service.model.dto.CategoryDto;
import com.myCart.product_service.model.entity.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {


    //get all categories
    List<CategoryDto> findAll();
    //get all categories pagination
    Page<CategoryDto> findAllCategory(int page, int size);
    //get a products by its id
    CategoryDto findById(final Long categoryId);
    //add new category
    CategoryDto addCategory(final CategoryDto categoryDto);
    //update category
    CategoryDto updateCategory(final CategoryDto categoryDto);
    //update category by id
    CategoryDto updateCategoryById(final Long categoryId, final CategoryDto categoryDto);
    //delete category
    void deleteCategory(final Long categoryId);
}
