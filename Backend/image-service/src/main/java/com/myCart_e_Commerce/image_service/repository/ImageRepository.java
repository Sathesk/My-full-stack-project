package com.myCart_e_Commerce.image_service.repository;

import com.myCart_e_Commerce.image_service.model.entity.ImageMeta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageMeta, Long> {
    Optional<ImageMeta> findByUsername(String username);

    Optional<ImageMeta> findByUserAuthId(Long userAuthId);
}