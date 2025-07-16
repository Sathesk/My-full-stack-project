package com.myCart_e_commerce_project.auth_service.mapper.Impl;

import com.myCart_e_commerce_project.auth_service.mapper.AuthMapper;
import com.myCart_e_commerce_project.auth_service.model.dto.AuthDto;
import com.myCart_e_commerce_project.auth_service.model.entity.Auth;
import org.springframework.stereotype.Component;

@Component
public class AuthMapperImpl implements AuthMapper {

    @Override
    public AuthDto toAuthDto(Auth auth){
        return AuthDto.builder()
                .userAuthId(auth.getUserAuthId())
                .username(auth.getUsername())
                .email(auth.getEmail())
                .password(null)
                .role(auth.getRole())
                .build();
    }

    @Override
    public Auth toAuth(AuthDto authDto){
        return Auth.builder()
                .userAuthId(authDto.getUserAuthId())
                .username(authDto.getUsername())
                .email(authDto.getEmail())
                .password(authDto.getPassword())
                .role(authDto.getRole())
                .build();
    }
}
