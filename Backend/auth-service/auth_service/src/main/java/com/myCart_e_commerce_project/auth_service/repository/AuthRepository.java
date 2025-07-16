package com.myCart_e_commerce_project.auth_service.repository;

import com.myCart_e_commerce_project.auth_service.model.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByUsername(String username);
    boolean existsByUsername(String username);
}
