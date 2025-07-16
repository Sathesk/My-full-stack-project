package com.myCart_e_commerce_project.user_service.mapper;

import com.myCart_e_commerce_project.user_service.model.dto.UserDto;
import com.myCart_e_commerce_project.user_service.model.entity.User;

public interface UserMapper {

    // Entity to DTO
    UserDto toUserDto(User user);

    // DTO to Entity
    User toUser(UserDto userDto);
}