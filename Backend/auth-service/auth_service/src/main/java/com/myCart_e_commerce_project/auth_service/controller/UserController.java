package com.myCart_e_commerce_project.auth_service.controller;

import com.myCart_e_commerce_project.auth_service.Service.AuthService;
import com.myCart_e_commerce_project.auth_service.model.dto.AuthDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authUsers")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService){this.authService = authService;}

    //get single user
    @GetMapping("/Id/{id}")
    public ResponseEntity<AuthDto> getUserById(@PathVariable("id") Long userAuthId){
        return ResponseEntity.ok(authService.getUserById(userAuthId));
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasAnyRole('BUYER', 'SUPPLIER')")
    public ResponseEntity<AuthDto> getUserByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(authService.getUserByUsername(username));
    }
    //register user
    @PostMapping
    public ResponseEntity<AuthDto> registerUser(@RequestBody @Valid AuthDto authDto){
        AuthDto createdUser = authService.registerUser(authDto);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    //update user
    @PutMapping("/{id}")
    public ResponseEntity<AuthDto> updateUser(@PathVariable Long id, @RequestBody @Valid AuthDto authDto){
        return ResponseEntity.ok(authService.updateUser(id, authDto));
    }

    //Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long userAuthId){
        authService.deleteUser(userAuthId);
        return ResponseEntity.noContent().build();
    }
}
