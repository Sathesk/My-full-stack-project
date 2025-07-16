package com.myCart.product_service.controller;

import com.myCart.product_service.model.dto.ProductRequestDto;
import com.myCart.product_service.model.dto.ProductResponseDto;
import com.myCart.product_service.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get all products
    @GetMapping("/productDetails")
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    // Get paginated products
    @GetMapping("/page")
    public ResponseEntity<Page<ProductResponseDto>> getPagedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(productService.findAllProducts(page, size));
    }

    @GetMapping("/sellerId/{sellerId}")
    public ResponseEntity<List<ProductResponseDto>> getProductsByUser(@PathVariable Long sellerId){
        return ResponseEntity.ok(productService.findBySellerId(sellerId));
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    // Add new product (JSON only)
    @PostMapping
    public ResponseEntity<ProductResponseDto> addProduct(
            @RequestBody @Valid ProductRequestDto productRequestDto) {
        System.out.println("Received product DTO: " + productRequestDto);
        ProductResponseDto response = productService.addProduct(productRequestDto);
        return ResponseEntity.ok(response);
    }

    // Update product by ID (JSON only)
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid ProductRequestDto productRequestDto) {

        ProductResponseDto response = productService.updateProductById(id, productRequestDto);
        return ResponseEntity.ok(response);
    }

    // Delete product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
