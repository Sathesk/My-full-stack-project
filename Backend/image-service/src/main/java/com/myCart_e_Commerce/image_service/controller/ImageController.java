package com.myCart_e_Commerce.image_service.controller;

import com.myCart_e_Commerce.image_service.model.entity.ImageMeta;
import com.myCart_e_Commerce.image_service.repository.ImageRepository;
import com.myCart_e_Commerce.image_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<ImageMeta> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userAuthId") Long userAuthId,
            @RequestParam("username") String username
    ) throws IOException {
        ImageMeta savedImageMeta = imageService.uploadImage(file, userAuthId, username);
        return ResponseEntity.ok(savedImageMeta);
    }

    @GetMapping("/user/{userAuthId}")
    public ResponseEntity<ImageMeta> getImageByUserAuthId(@PathVariable Long userAuthId) {
        return imageRepository.findByUserAuthId(userAuthId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadImage(@PathVariable Long id) {
        byte[] imageBytes = imageService.downloadImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        return ResponseEntity.ok("Image deleted successfully");
    }
}
