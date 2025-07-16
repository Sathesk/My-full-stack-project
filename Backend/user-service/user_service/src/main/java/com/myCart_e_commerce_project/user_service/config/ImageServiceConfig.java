package com.myCart_e_commerce_project.user_service.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "image.service")
public class ImageServiceConfig {
    private String baseUrl;
}