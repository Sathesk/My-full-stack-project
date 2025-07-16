package com.myCart_e_commerce_project.auth_service.mapper;


import com.myCart_e_commerce_project.auth_service.model.dto.AuthDto;
import com.myCart_e_commerce_project.auth_service.model.entity.Auth;

public interface AuthMapper {

    //Entity to DTO
    AuthDto toAuthDto(Auth auth);

    //DTO to Entity
    Auth toAuth(AuthDto authDto);
}
