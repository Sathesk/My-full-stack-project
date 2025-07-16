package com.myCart.product_service.service.impl;

import com.myCart.product_service.exception.CategoryNotFoundException;
import com.myCart.product_service.exception.CategorySaveException;
import com.myCart.product_service.mapper.CategoryMapper;
import com.myCart.product_service.model.dto.CategoryDto;
import com.myCart.product_service.model.entity.Category;
import com.myCart.product_service.repository.CategoryRepository;
import com.myCart.product_service.service.CategoryService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDto> findAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::toCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryDto> findAllCategory(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("categoryId").descending());
        Page<Category> categoryPage = categoryRepository.findAll(pageable);

        List<CategoryDto> categoryDtos = categoryPage.getContent()
                .stream()
                .map(categoryMapper::toCategoryDto)
                .collect(Collectors.toList());

        return new PageImpl<>(categoryDtos, pageable, categoryPage.getTotalElements());
    }

    @Override
    public CategoryDto findById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + categoryId));
        return categoryMapper.toCategoryDto(category);
    }

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        try {
            Category category = categoryMapper.toCategory(categoryDto);
            Category saved = categoryRepository.save(category);
            return categoryMapper.toCategoryDto(saved);
        } catch (DataIntegrityViolationException e) {
            throw new CategorySaveException("Error saving category: Data integrity violation", e);
        } catch (Exception e) {
            throw new CategorySaveException("Unexpected error saving category", e);
        }
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryDto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + categoryDto.getCategoryId()));

        category.setCategoryName(categoryDto.getCategoryName());
        Category updated = categoryRepository.save(category);
        return categoryMapper.toCategoryDto(updated);
    }

    @Override
    public CategoryDto updateCategoryById(Long categoryId, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + categoryId));

        category.setCategoryName(categoryDto.getCategoryName());
        Category updated = categoryRepository.save(category);
        return categoryMapper.toCategoryDto(updated);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + categoryId));
        categoryRepository.delete(category);
    }
}
