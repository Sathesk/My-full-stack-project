package com.myCart.product_service.controller;

import com.myCart.product_service.model.dto.SubCategoryDto;
import com.myCart.product_service.service.SubCategoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subcategories")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    // Get all subcategories
    @GetMapping
    public ResponseEntity<List<SubCategoryDto>> getAllSubCategories() {
        return ResponseEntity.ok(subCategoryService.findAll());
    }

    // Get all subcategories with pagination
    @GetMapping("/page")
    public ResponseEntity<Page<SubCategoryDto>> getSubCategoriesWithPagination(
            @RequestParam int page,
            @RequestParam int size) {
        return ResponseEntity.ok(subCategoryService.findAllSubCategory(page, size));
    }

    // Get a single subcategory by ID
    @GetMapping("/{id}")
    public ResponseEntity<SubCategoryDto> getSubCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(subCategoryService.findById(id));
    }

    // Add a new subcategory
    @PostMapping
    public ResponseEntity<SubCategoryDto> createSubCategory(@RequestBody @Valid SubCategoryDto subCategoryDto) {
        SubCategoryDto created = subCategoryService.addSubCategory(subCategoryDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Update a subcategory by ID
    @PutMapping("/{id}")
    public ResponseEntity<SubCategoryDto> updateSubCategory(
            @PathVariable Long id,
            @RequestBody @Valid SubCategoryDto subCategoryDto) {
        return ResponseEntity.ok(subCategoryService.updateSubCategoryById(id, subCategoryDto));
    }

    // Delete a subcategory by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubCategory(@PathVariable Long id) {
        subCategoryService.deleteSubCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
