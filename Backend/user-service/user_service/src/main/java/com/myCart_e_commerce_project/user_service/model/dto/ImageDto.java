package com.myCart_e_commerce_project.user_service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {

    private Long imageId;
    private Long userAuthId;
    private String username;
    private String s3Key;
    private String imageUrl;
}
