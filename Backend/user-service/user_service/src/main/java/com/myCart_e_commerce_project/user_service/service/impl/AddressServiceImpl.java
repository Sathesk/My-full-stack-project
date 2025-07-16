package com.myCart_e_commerce_project.user_service.service.impl;

import com.myCart_e_commerce_project.user_service.exception.AddressNotFoundException;
import com.myCart_e_commerce_project.user_service.exception.AddressSaveException;
import com.myCart_e_commerce_project.user_service.mapper.AddressMapper;
import com.myCart_e_commerce_project.user_service.model.dto.AddressDto;
import com.myCart_e_commerce_project.user_service.model.entity.Address;
import com.myCart_e_commerce_project.user_service.model.entity.AddressType;
import com.myCart_e_commerce_project.user_service.model.entity.User;
import com.myCart_e_commerce_project.user_service.repository.AddressRepository;
import com.myCart_e_commerce_project.user_service.repository.UserRepository;
import com.myCart_e_commerce_project.user_service.service.AddressService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final UserRepository userRepository;

    public AddressServiceImpl(UserRepository userRepository, AddressRepository addressRepository, AddressMapper addressMapper) {
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
        this.userRepository = userRepository;
    }

    @Override
    public AddressDto getAddressDetailsById(Long userId) {
        return addressRepository.findByUserUserId(userId)
                .map(addressMapper::toAddressDto)
                .orElseThrow(() -> new NoSuchElementException("Address not found for userId: " + userId));
    }

    @Override
    public AddressDto getAddressByUserIdAndType(Long userId, AddressType addressType) {
        return addressRepository.findByUserUserIdAndAddressType(userId, addressType)
                .map(addressMapper::toAddressDto)
                .orElseThrow(() -> new NoSuchElementException("Address not found for userId: " + userId + " and type: " + addressType));
    }

    @Override
    public AddressDto addAddress(AddressDto addressDto) {
        try {
            User user = userRepository.findById(addressDto.getUserId())
                    .orElseThrow(() -> new NoSuchElementException("User not found for ID: " + addressDto.getUserId()));
            Address newAddress = addressMapper.toAddress(addressDto, user);
            Address savedAddress = addressRepository.save(newAddress);
            return addressMapper.toAddressDto(savedAddress);
        } catch (DataIntegrityViolationException e) {
            throw new AddressSaveException("Error saving address: Data integration violation" + e);
        } catch (Exception e) {
            throw new AddressSaveException("Error saving address" + e);
        }
    }

    @Override
    public AddressDto updateAddress(AddressDto addressDto) {
        Address existingAddress = addressRepository.findById(addressDto.getAddressId())
                .orElseThrow(() -> new AddressNotFoundException("Address not found for ID: " + addressDto.getAddressId()));

        updateAddressFields(existingAddress, addressDto);
        Address updatedAddress = addressRepository.save(existingAddress);
        return addressMapper.toAddressDto(updatedAddress);
    }

    private void updateAddressFields(Address address, AddressDto addressDto) {
        address.setAddressType(addressDto.getAddressType());
        address.setStreetName(addressDto.getStreetName());
        address.setCity(addressDto.getCity());
        address.setZip(addressDto.getZip());
        address.setCountry(addressDto.getCountry());
    }

    @Override
    public void deleteAddress(final Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException("Address not found for ID: " + addressId));
        addressRepository.delete(address);
    }
}
