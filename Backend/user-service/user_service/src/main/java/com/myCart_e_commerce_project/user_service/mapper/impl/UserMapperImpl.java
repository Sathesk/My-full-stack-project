package com.myCart_e_commerce_project.user_service.mapper.impl;

import com.myCart_e_commerce_project.user_service.mapper.AddressMapper;
import com.myCart_e_commerce_project.user_service.mapper.UserMapper;
import com.myCart_e_commerce_project.user_service.model.dto.UserDto;
import com.myCart_e_commerce_project.user_service.model.entity.Address;
import com.myCart_e_commerce_project.user_service.model.entity.User;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapperImpl implements UserMapper {

    private final AddressMapper addressMapper;

    public UserMapperImpl(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    @Override
    public UserDto toUserDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .userAuthId(user.getUserAuthId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .description(user.getDescription())
                .profilePictureUrl(user.getProfilePictureUrl())
                .addresses(user.getAddresses() != null
                        ? user.getAddresses().stream().map(addressMapper::toAddressDto).toList()
                        : Collections.emptyList())
                .build();
    }

    @Override
    public User toUser(UserDto userDto) {
        User user = User.builder()
                .userId(userDto.getUserId())
                .userAuthId(userDto.getUserAuthId())
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .phoneNumber(userDto.getPhoneNumber())
                .description(userDto.getDescription())
                .profilePictureUrl(userDto.getProfilePictureUrl())
                .build();

        if (userDto.getAddresses() != null) {
            List<Address> addresses = userDto.getAddresses().stream()
                    .map(a -> addressMapper.toAddress(a, user))
                    .collect(Collectors.toList());
            user.setAddresses(addresses);
        }

        return user;
    }
}
