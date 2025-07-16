package com.myCart_e_commerce_project.user_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    private final AuthServiceConfig authServiceConfig;
    private final ImageServiceConfig imageServiceConfig;

    public WebClientConfig(AuthServiceConfig authServiceConfig, ImageServiceConfig imageServiceConfig){
        this.authServiceConfig = authServiceConfig;
        this.imageServiceConfig = imageServiceConfig;
    }

    @Bean(name = "authWebClient")
    public WebClient authWebClient() {
        return WebClient.builder()
                .baseUrl(authServiceConfig.getBaseUrl())
                .build();
    }

    @Bean(name = "imageWebClient")
    public WebClient imageWebClient() {
        return WebClient.builder()
                .baseUrl(imageServiceConfig.getBaseUrl())
                .build();
    }
}