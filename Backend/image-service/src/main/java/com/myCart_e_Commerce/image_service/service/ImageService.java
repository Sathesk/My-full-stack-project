package com.myCart_e_Commerce.image_service.service;

import com.myCart_e_Commerce.image_service.model.entity.ImageMeta;
import com.myCart_e_Commerce.image_service.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {

    private final S3Service s3Service;
    private final ImageRepository repository;

    public ImageMeta uploadImage(MultipartFile file, Long userAuthId, String username) throws IOException {
        s3Service.validateImage(file);
        String imageUrl = s3Service.uploadFile(file);
        String key = s3Service.extractKeyFromUrl(imageUrl);

        ImageMeta meta = ImageMeta.builder()
                .userAuthId(userAuthId)
                .username(username)
                .imageUrl(imageUrl)
                .s3Key(key)
                .createdAt(Instant.now())
                .build();

        log.info("Image metadata saved for user: {}", username);
        return repository.save(meta);
    }

    public byte[] downloadImage(Long imageId) {
        ImageMeta meta = repository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found with ID: " + imageId));
        return s3Service.downloadFile(meta.getImageUrl());
    }

    public void deleteImage(Long imageId) {
        ImageMeta meta = repository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found with ID: " + imageId));
        s3Service.deleteFile(meta.getImageUrl());
        repository.delete(meta);
        log.info("Deleted image ID: {}", imageId);
    }
}
