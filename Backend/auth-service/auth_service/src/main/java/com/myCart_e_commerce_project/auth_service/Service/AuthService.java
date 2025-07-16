package com.myCart_e_commerce_project.auth_service.Service;

import com.myCart_e_commerce_project.auth_service.model.dto.AuthDto;
import com.myCart_e_commerce_project.auth_service.model.entity.Auth;


public interface AuthService {

    //get user by username
    AuthDto getUserByUsername(final String username);

    //get single user
    AuthDto getUserById(final Long userAuthId);

    //register user
    AuthDto registerUser(final AuthDto authDto);

    //update user
    AuthDto updateUser(final Long userAuthId, final AuthDto authDto);

    //delete user
    void deleteUser(final Long userAuthId);
}
