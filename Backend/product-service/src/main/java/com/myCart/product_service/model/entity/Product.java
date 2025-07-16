package com.myCart.product_service.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(exclude = {"category", "subCategory"})
@SuperBuilder
@Entity
@Table(name = "products")
public class Product extends AbstractMappedEntity{

    //core product information
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", unique = true, nullable = false, updatable = false)
    @EqualsAndHashCode.Include
    private Long productId;

    @Column(name = "product_name", nullable = false, length = 255)
    private String productName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "brand", nullable = false, length = 100)
    private String brand;

    @Column(name = "manufacturer", nullable = false, length = 100)
    private String manufacturer;

    //pricing information
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "discount_price")
    private Double discountPrice;

    //stock fields
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "stock_status", nullable = false)
    private StockStatus stockStatus;

    //Product classification
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

    //variant info
    @Column(name = "color", nullable = false, length = 50)
    private String color;

    @Column(name = "size", nullable = false, length = 20)
    private String size;

    @Column(name = "material", nullable = false, length = 100)
    private String material;

    @Column(name = "weight")
    private Double weight;

    //media
    @Column(name = "product_image_url", length = 512)
    private String productImageUrl;

    //seller details
    @Column(name = "seller_id", nullable = false)
    private Long sellerId;

}
