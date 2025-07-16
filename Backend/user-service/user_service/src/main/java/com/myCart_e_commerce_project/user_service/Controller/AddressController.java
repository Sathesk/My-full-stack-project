package com.myCart_e_commerce_project.user_service.Controller;

import com.myCart_e_commerce_project.user_service.model.dto.AddressDto;
import com.myCart_e_commerce_project.user_service.model.entity.AddressType;
import com.myCart_e_commerce_project.user_service.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userprofile")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService){
        this.addressService = addressService;
    }

    // Get address by userId and addressType
    @GetMapping("/addresses/{userId}")
    public ResponseEntity<AddressDto> getAddressByTypeAndId(
            @PathVariable Long userId,
            @RequestParam AddressType addressType // e.g., /addresses/123?addressType=HOME
    ){
        AddressDto addressDto = addressService.getAddressByUserIdAndType(userId, addressType);
        return ResponseEntity.ok(addressDto);
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDto> addAddress(@RequestBody @Valid AddressDto addressDto){
        AddressDto createdAddress = addressService.addAddress(addressDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAddress);
    }

    @PutMapping("/addresses")
    public ResponseEntity<AddressDto> updateAddress(@RequestBody @Valid AddressDto addressDto){
        AddressDto updatedAddress = addressService.updateAddress(addressDto);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id){
        addressService.deleteAddress(id);
        return ResponseEntity.noContent().build();
    }
}
