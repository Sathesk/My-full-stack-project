package com.myCart_e_Commerce.image_service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ImageMetaDto {

    private Long imageId;
    private Long userAuthId;
    private String username;
    private String s3Key;
    private String imageUrl;
}