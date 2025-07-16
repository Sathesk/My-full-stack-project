package com.myCart_e_commerce_project.user_service.model.dto;

import com.myCart_e_commerce_project.user_service.model.entity.AddressType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {
    private Long addressId;
    private AddressType addressType;
    private String streetName;
    private String city;
    private String zip;
    private String country;
    private Long userId;
}
