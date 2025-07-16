package com.myCart_e_Commerce.image_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    private final AuthServiceConfig authServiceConfig;

    public WebClientConfig(AuthServiceConfig authServiceConfig){
        this.authServiceConfig = authServiceConfig;
    }

    @Bean
    public WebClient webClient(){
        return WebClient.builder()
                .baseUrl(authServiceConfig.getBaseUrl())
                .build();
    }
}