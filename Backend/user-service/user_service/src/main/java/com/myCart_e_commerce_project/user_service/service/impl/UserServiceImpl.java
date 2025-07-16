package com.myCart_e_commerce_project.user_service.service.impl;

import com.myCart_e_commerce_project.user_service.exception.UserNotFoundException;
import com.myCart_e_commerce_project.user_service.exception.UserSaveException;
import com.myCart_e_commerce_project.user_service.mapper.AddressMapper;
import com.myCart_e_commerce_project.user_service.mapper.UserMapper;
import com.myCart_e_commerce_project.user_service.model.dto.UserDto;
import com.myCart_e_commerce_project.user_service.model.entity.User;
import com.myCart_e_commerce_project.user_service.repository.UserRepository;
import com.myCart_e_commerce_project.user_service.service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, AddressMapper addressMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.addressMapper = addressMapper;
    }

    @Override
    public UserDto getUserDetails(Long userId) {
        User userData = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        return userMapper.toUserDto(userData);
    }

    @Override
    public UserDto getUserDetailsByUsername(String username) {
        User userData = userRepository.findByUsername(username);
        if (userData == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }
        return userMapper.toUserDto(userData);
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserDto)
                .toList();
    }

    @Override
    public UserDto addUser(UserDto userDto) {
        try {
            User newUser = userMapper.toUser(userDto);
            User savedUser = userRepository.save(newUser);
            return userMapper.toUserDto(savedUser);
        } catch (DataIntegrityViolationException e) {
            throw new UserSaveException("Error saving user: Data integration violation" + e);
        } catch (Exception e) {
            throw new UserSaveException("Error saving user" + e);
        }
    }

    @Override
    public UserDto updateUser(Long userId, UserDto userDto) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(
                        "User not found with id: " + userDto.getUserId()
                ));

        updateUserFields(existingUser, userDto);
        User updatedUser = userRepository.save(existingUser);
        return userMapper.toUserDto(updatedUser);
    }

    @Override
    public void deleteUser(final Long userId) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        userRepository.delete(existingUser);
    }

    private void updateUserFields(User user, UserDto userDto) {
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setDescription(userDto.getDescription());
        user.setProfilePictureUrl(userDto.getProfilePictureUrl());

        if (userDto.getAddresses() != null) {
            user.setAddresses(
                    userDto.getAddresses().stream()
                            .map(dto -> addressMapper.toAddress(dto, user))
                            .toList()
            );
        }
    }
}