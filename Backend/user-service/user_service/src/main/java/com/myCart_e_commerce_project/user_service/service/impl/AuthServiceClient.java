package com.myCart_e_commerce_project.user_service.service.impl;

import com.myCart_e_commerce_project.user_service.model.dto.AuthUserDto;
import jakarta.ws.rs.core.HttpHeaders;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AuthServiceClient {

    private final WebClient authWebClient;

    public AuthServiceClient(@Qualifier("authWebClient") WebClient authWebClient){
        this.authWebClient = authWebClient;
    }

    public Mono<AuthUserDto> getAuthUser(Long userAuthId, String jwtToken){
        return authWebClient.get()
                .uri("/Id/{userAuthId}", userAuthId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> Mono.error(new RuntimeException("AuthService error: " + errorBody)))
                )
                .bodyToMono(AuthUserDto.class);
    }
}
