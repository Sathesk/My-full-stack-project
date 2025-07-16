package com.myCart.product_service.service.impl;

import com.myCart.product_service.exception.SubCategoryNotFoundException;
import com.myCart.product_service.exception.SubCategorySaveException;
import com.myCart.product_service.mapper.SubCategoryMapper;
import com.myCart.product_service.model.dto.SubCategoryDto;
import com.myCart.product_service.model.entity.SubCategory;
import com.myCart.product_service.repository.SubCategoryRepository;
import com.myCart.product_service.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubCategoryServiceImpl implements SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;
    private final SubCategoryMapper subCategoryMapper;

    @Override
    public List<SubCategoryDto> findAll() {
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        return subCategories.stream()
                .map(subCategoryMapper::toSubCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<SubCategoryDto> findAllSubCategory(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("subCategoryId").descending());
        Page<SubCategory> pageData = subCategoryRepository.findAll(pageable);

        List<SubCategoryDto> dtoList = pageData.getContent()
                .stream()
                .map(subCategoryMapper::toSubCategoryDto)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, pageData.getTotalElements());
    }

    @Override
    public SubCategoryDto findById(Long subCategoryId) {
        SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> new SubCategoryNotFoundException("SubCategory not found with id: " + subCategoryId));
        return subCategoryMapper.toSubCategoryDto(subCategory);
    }

    @Override
    public SubCategoryDto addSubCategory(SubCategoryDto dto) {
        try {
            SubCategory subCategory = subCategoryMapper.toSubCategory(dto);
            SubCategory saved = subCategoryRepository.save(subCategory);
            return subCategoryMapper.toSubCategoryDto(saved);
        } catch (DataIntegrityViolationException e) {
            throw new SubCategorySaveException("Data integrity violation while saving subcategory", e);
        } catch (Exception e) {
            throw new SubCategorySaveException("Unexpected error while saving subcategory", e);
        }
    }

    @Override
    public SubCategoryDto updateSubCategory(SubCategoryDto dto) {
        SubCategory subCategory = subCategoryRepository.findById(dto.getSubCategoryId())
                .orElseThrow(() -> new SubCategoryNotFoundException("SubCategory not found with id: " + dto.getSubCategoryId()));

        subCategory.setSubCategoryName(dto.getSubCategoryName());
        SubCategory updated = subCategoryRepository.save(subCategory);
        return subCategoryMapper.toSubCategoryDto(updated);
    }

    @Override
    public SubCategoryDto updateSubCategoryById(Long subCategoryId, SubCategoryDto dto) {
        SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> new SubCategoryNotFoundException("SubCategory not found with id: " + subCategoryId));

        subCategory.setSubCategoryName(dto.getSubCategoryName());
        SubCategory updated = subCategoryRepository.save(subCategory);
        return subCategoryMapper.toSubCategoryDto(updated);
    }

    @Override
    public void deleteSubCategoryById(Long subCategoryId) {
        SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> new SubCategoryNotFoundException("SubCategory not found with id: " + subCategoryId));
        subCategoryRepository.delete(subCategory);
    }
}
