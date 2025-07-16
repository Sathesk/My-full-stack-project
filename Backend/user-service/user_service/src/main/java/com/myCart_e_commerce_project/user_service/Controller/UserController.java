package com.myCart_e_commerce_project.user_service.Controller;

import com.myCart_e_commerce_project.user_service.model.dto.AuthUserDto;
import com.myCart_e_commerce_project.user_service.model.dto.UserDto;
import com.myCart_e_commerce_project.user_service.service.UserService;
import com.myCart_e_commerce_project.user_service.service.impl.AuthServiceClient;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/userprofile")
public class UserController {

    private final UserService userService;
    private final AuthServiceClient authServiceClient;

    public UserController(UserService userService, AuthServiceClient authServiceClient){
        this.userService = userService;
        this.authServiceClient = authServiceClient;
    }

    // Get user by id
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable Long userId){
        UserDto userDto = userService.getUserDetails(userId);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserDetailsByUsername(@PathVariable String username){
        UserDto userDto = userService.getUserDetailsByUsername(username);
        return ResponseEntity.ok(userDto);
    }



    // Get all users
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    // Register new user
    @PostMapping
    public ResponseEntity<?> addUser(
            @RequestBody @Valid UserDto userDto,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        String jwtToken = authHeader.replace("Bearer ", "").trim();
        Long userAuthId = userDto.getUserAuthId();

        if (userAuthId == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "userAuthId is required"));
        }

        AuthUserDto authUserDto = authServiceClient.getAuthUser(userAuthId, jwtToken)
                .onErrorResume(e -> Mono.empty())
                .block();



        if (authUserDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Auth user not found"));
        }

        enrichUserDtoWithAuthInfo(userDto, authUserDto);

        UserDto savedUser = userService.addUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    // Update existing user
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @RequestBody @Valid UserDto userDto,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        String jwtToken = authHeader.replace("Bearer ", "").trim();
        Long userAuthId = userDto.getUserAuthId();

        AuthUserDto authUserDto = authServiceClient.getAuthUser(userAuthId, jwtToken).block();

        if (authUserDto == null) {
            throw new RuntimeException("Auth user not found");
        }

        enrichUserDtoWithAuthInfo(userDto, authUserDto);

        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    private void enrichUserDtoWithAuthInfo(UserDto userDto, AuthUserDto authUserDto){
        userDto.setUsername(authUserDto.getUsername());
        userDto.setEmail(authUserDto.getEmail());
    }
}
