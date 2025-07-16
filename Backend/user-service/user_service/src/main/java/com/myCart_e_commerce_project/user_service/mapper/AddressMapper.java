package com.myCart_e_commerce_project.user_service.mapper;

import com.myCart_e_commerce_project.user_service.model.dto.AddressDto;
import com.myCart_e_commerce_project.user_service.model.entity.Address;
import com.myCart_e_commerce_project.user_service.model.entity.User;

import java.util.List;

public interface AddressMapper {

    // Entity to DTO
    AddressDto toAddressDto(Address address);

    // DTO to Entity with user object
    Address toAddress(AddressDto addressDto, User user);

    List<AddressDto> toAddressDtoList(List<Address> addresses);
}