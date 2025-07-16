package com.myCart.product_service.service.impl;

import com.myCart.product_service.exception.CategoryNotFoundException;
import com.myCart.product_service.exception.ProductNotFoundException;
import com.myCart.product_service.exception.ProductSaveException;
import com.myCart.product_service.exception.SubCategoryNotFoundException;
import com.myCart.product_service.mapper.ProductMapper;
import com.myCart.product_service.model.dto.ProductRequestDto;
import com.myCart.product_service.model.dto.ProductResponseDto;
import com.myCart.product_service.model.entity.Category;
import com.myCart.product_service.model.entity.Product;
import com.myCart.product_service.model.entity.SubCategory;
import com.myCart.product_service.repository.CategoryRepository;
import com.myCart.product_service.repository.ProductRepository;
import com.myCart.product_service.repository.SubCategoryRepository;
import com.myCart.product_service.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              ProductMapper productMapper,
                              CategoryRepository categoryRepository,
                              SubCategoryRepository subCategoryRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public List<ProductResponseDto> findAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toProductResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> findBySellerId(Long sellerId){
        List<Product> products = productRepository.findBySellerId(sellerId);
        return products.stream()
                .map(productMapper::toProductResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ProductResponseDto> findAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("productId").descending());
        Page<Product> productPage = productRepository.findAll(pageable);

        List<ProductResponseDto> dtoList = productPage.getContent()
                .stream()
                .map(productMapper::toProductResponseDto)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, productPage.getTotalElements());
    }

    @Override
    public ProductResponseDto findById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
        return productMapper.toProductResponseDto(product);
    }

    @Override
    @Transactional
    public ProductResponseDto updateProduct(ProductRequestDto dto) {
        if (dto.getProductId() == null) {
            throw new IllegalArgumentException("Product ID must be provided for update");
        }
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + dto.getProductId()));

        updateProductFields(product, dto);
        Product updated = productRepository.save(product);
        return productMapper.toProductResponseDto(updated);
    }

    @Override
    @Transactional
    public ProductResponseDto updateProductById(Long productId, ProductRequestDto dto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));

        updateProductFields(product, dto);
        Product updated = productRepository.save(product);
        return productMapper.toProductResponseDto(updated);
    }

    @Override
    @Transactional
    public ProductResponseDto addProduct(ProductRequestDto dto) {
        try {
            Product product = productMapper.toProduct(dto);
            Product saved = productRepository.save(product);
            return productMapper.toProductResponseDto(saved);
        } catch (DataIntegrityViolationException e) {
            logger.error("Data integrity violation while saving product", e);
            throw new ProductSaveException("Data integrity violation while saving product", e);
        } catch (Exception e) {
            logger.error("Unexpected error while saving product", e);
            throw new ProductSaveException("Unexpected error while saving product", e);
        }
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
        productRepository.delete(product);
    }

    // ✅ Fully populated field update logic
    private void updateProductFields(Product product, ProductRequestDto dto) {
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setManufacturer(dto.getManufacturer());
        product.setPrice(dto.getPrice());
        product.setDiscountPrice(dto.getDiscountPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setStockStatus(dto.getStockStatus());
        product.setColor(dto.getColor());
        product.setSize(dto.getSize());
        product.setMaterial(dto.getMaterial());
        product.setWeight(dto.getWeight());
        product.setProductImageUrl(dto.getProductImageUrl());
        product.setSellerId(dto.getSellerId());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + dto.getCategoryId()));
            product.setCategory(category);
        }

        if (dto.getSubCategoryId() != null) {
            SubCategory subCategory = subCategoryRepository.findById(dto.getSubCategoryId())
                    .orElseThrow(() -> new SubCategoryNotFoundException("SubCategory not found with id: " + dto.getSubCategoryId()));
            product.setSubCategory(subCategory);
        }
    }
}
