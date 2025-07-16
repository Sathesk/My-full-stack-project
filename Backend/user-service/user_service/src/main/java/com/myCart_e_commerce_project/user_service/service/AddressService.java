package com.myCart_e_commerce_project.user_service.service;

import com.myCart_e_commerce_project.user_service.model.dto.AddressDto;
import com.myCart_e_commerce_project.user_service.model.entity.AddressType;

import java.util.List;

public interface AddressService {

    AddressDto getAddressDetailsById(final Long userId);

    AddressDto getAddressByUserIdAndType(final Long userId, final AddressType addressType);

    AddressDto addAddress(final AddressDto addressDto);

    AddressDto updateAddress(final AddressDto addressDto);

    void deleteAddress(final Long addressId);
}