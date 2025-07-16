package com.myCart.product_service.mapper;

import com.myCart.product_service.model.dto.ProductRequestDto;
import com.myCart.product_service.model.dto.ProductResponseDto;
import com.myCart.product_service.model.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, SubCategoryMapper.class})
public interface ProductMapper {

    // Entity to DTO
    ProductResponseDto toProductResponseDto(Product product);

    //DTO to Entity
    Product toProduct(ProductRequestDto productRequestDto);
}
