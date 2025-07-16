package com.myCart_e_commerce_project.user_service.service;

import com.myCart_e_commerce_project.user_service.model.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto getUserDetails(Long userId);


    UserDto getUserDetailsByUsername(String username);

    List<UserDto> findAll();

    UserDto addUser(final UserDto userDto);

    UserDto updateUser(final Long userId, final UserDto userDto);

    void deleteUser(final Long userId);
}