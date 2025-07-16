package com.myCart_e_commerce_project.user_service.mapper.impl;

import com.myCart_e_commerce_project.user_service.mapper.AddressMapper;
import com.myCart_e_commerce_project.user_service.model.dto.AddressDto;
import com.myCart_e_commerce_project.user_service.model.entity.Address;
import com.myCart_e_commerce_project.user_service.model.entity.User;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public AddressDto toAddressDto(Address address) {
        if (address == null) return null;

        return AddressDto.builder()
                .addressId(address.getAddressId())
                .addressType(address.getAddressType())
                .streetName(address.getStreetName())
                .city(address.getCity())
                .zip(address.getZip())
                .country(address.getCountry())
                .userId(address.getUser() != null ? address.getUser().getUserId() : null)
                .build();
    }

    @Override
    public Address toAddress(AddressDto addressDto, User user) {
        if (addressDto == null) return null;

        return Address.builder()
                .addressId(addressDto.getAddressId())
                .addressType(addressDto.getAddressType())
                .streetName(addressDto.getStreetName())
                .city(addressDto.getCity())
                .zip(addressDto.getZip())
                .country(addressDto.getCountry())
                .user(user)
                .build();
    }

    @Override
    public List<AddressDto> toAddressDtoList(List<Address> addresses) {
        if (addresses == null || addresses.isEmpty()) {
            return Collections.emptyList();
        }

        return addresses.stream()
                .map(this::toAddressDto)
                .collect(Collectors.toList());
    }
}