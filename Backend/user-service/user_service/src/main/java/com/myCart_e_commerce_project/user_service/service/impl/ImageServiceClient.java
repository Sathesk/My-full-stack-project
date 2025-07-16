package com.myCart_e_commerce_project.user_service.service.impl;

import com.myCart_e_commerce_project.user_service.model.dto.ImageDto;
import jakarta.ws.rs.core.HttpHeaders;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ImageServiceClient {

    private final WebClient imageWebClient;

    public ImageServiceClient(@Qualifier("imageWebClient") WebClient imageWebClient){
        this.imageWebClient = imageWebClient;
    }

    public Mono<ImageDto> getImage(Long userAuthId, String jwtToken){
        return imageWebClient.get()
                .uri("/{userAuthId}", userAuthId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> Mono.error(new RuntimeException("ImageService error: " + errorBody)))
                )
                .bodyToMono(ImageDto.class);
    }
}
