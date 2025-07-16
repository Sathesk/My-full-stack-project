package com.myCart_e_commerce_project.auth_service.model.dto;

import com.myCart_e_commerce_project.auth_service.model.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthDto {
    private Long userAuthId;
    private String username;
    private String email;
    private String password;
    private Role role;
}
