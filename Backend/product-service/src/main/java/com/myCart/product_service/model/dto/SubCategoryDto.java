package com.myCart.product_service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SubCategoryDto {

    private Long subCategoryId;
    private String subCategoryName;
    private Long categoryId;
}
