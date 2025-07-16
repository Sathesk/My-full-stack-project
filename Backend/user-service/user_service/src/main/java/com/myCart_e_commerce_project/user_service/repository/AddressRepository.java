package com.myCart_e_commerce_project.user_service.repository;

import com.myCart_e_commerce_project.user_service.model.entity.Address;
import com.myCart_e_commerce_project.user_service.model.entity.AddressType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUserUserIdAndAddressType(Long userId, AddressType addressType);
    Optional<Address> findByUserUserId(Long userId);
}
