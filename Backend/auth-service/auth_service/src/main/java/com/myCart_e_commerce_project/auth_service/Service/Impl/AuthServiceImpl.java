package com.myCart_e_commerce_project.auth_service.Service.Impl;

import com.myCart_e_commerce_project.auth_service.Service.AuthService;
import com.myCart_e_commerce_project.auth_service.exception.UserNotFoundException;
import com.myCart_e_commerce_project.auth_service.exception.UserSaveException;
import com.myCart_e_commerce_project.auth_service.mapper.AuthMapper;
import com.myCart_e_commerce_project.auth_service.model.dto.AuthDto;
import com.myCart_e_commerce_project.auth_service.model.entity.Auth;
import com.myCart_e_commerce_project.auth_service.repository.AuthRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final AuthRepository authRepository;

    public AuthServiceImpl(AuthMapper authMapper, AuthRepository authRepository, PasswordEncoder passwordEncoder){
        this.authMapper = authMapper;
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthDto getUserById(final Long userAuthID){
        Auth userData = authRepository.findById(userAuthID).orElseThrow(() -> new UserNotFoundException("User not found with id: " + userAuthID));
        return authMapper.toAuthDto(userData);
    }

    @Override
    public AuthDto getUserByUsername(final String username){
        Auth userData = authRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
        return authMapper.toAuthDto(userData);
    }

    @Override
    public AuthDto registerUser(final AuthDto authDto){
        try{
            //check the existing username
            if(authRepository.existsByUsername(authDto.getUsername())){
                throw new UserSaveException("Username is already taken");
            }

            Auth newAuth = authMapper.toAuth(authDto);
            newAuth.setPassword(passwordEncoder.encode(authDto.getPassword()));
            Auth savedAuth = authRepository.save(newAuth);
            return authMapper.toAuthDto(savedAuth);
        }catch(DataIntegrityViolationException e){
            System.out.println("Error saving user: Data integrity violation");
            throw new UserSaveException("Error saving user: Data integration violation");
        } catch (Exception e) {
            System.out.println("Error saving product");
            throw new UserSaveException("Error Saving User" + e);
        }
    }

    @Override
    public AuthDto updateUser(final Long userAuthId, final AuthDto authDto){
        Auth existingAuth = authRepository.findById(userAuthId)
                .orElseThrow(() -> new UserNotFoundException(
                   "Product not found with id: " + userAuthId
                ));

        updateUserFields(existingAuth, authDto);

        Auth updateAuth = authRepository.save(existingAuth);
        return authMapper.toAuthDto(updateAuth);
    }

    private void updateUserFields(Auth auth, AuthDto authDto){
        auth.setUsername(authDto.getUsername());
        auth.setPassword(passwordEncoder.encode(authDto.getPassword()));
        auth.setEmail(authDto.getEmail());
        auth.setRole(authDto.getRole());
    }

    @Override
    public void deleteUser(final Long userAuthId){
        Auth existingAuth = authRepository.findById(userAuthId)
                .orElseThrow(() -> new UserNotFoundException(
                        "User not found with id: " + userAuthId
                ));
        authRepository.delete(existingAuth);
    }
}
