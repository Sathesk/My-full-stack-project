package com.myCart_e_Commerce.image_service.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// AuthServiceConfig.java
@Component
@ConfigurationProperties(prefix = "auth.service")
@Getter
@Setter
public class AuthServiceConfig {
    private String baseUrl;
}