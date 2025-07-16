package com.myCart_e_Commerce.image_service.service;

import com.myCart_e_Commerce.image_service.config.S3Buckets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

    private final S3Client s3Client;
    private final S3Buckets s3Buckets;
    private static final String IMAGE_FOLDER = "profiles/";

    public String uploadFile(MultipartFile file) throws IOException {
        validateImage(file);

        String key = IMAGE_FOLDER + UUID.randomUUID() + "_" + file.getOriginalFilename();
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(s3Buckets.getUser())
                        .key(key)
                        .contentType(file.getContentType())
                        .build(), // ✅ Removed .acl(PUBLIC_READ)
                RequestBody.fromBytes(file.getBytes())
        );

        log.info("File uploaded successfully with key: {}", key);

        // Return direct URL (this will be private unless made public or you use signed URL)
        return "https://" + s3Buckets.getUser() + ".s3.amazonaws.com/" + key;
    }

    public byte[] downloadFile(String imageUrl) {
        String key = extractKeyFromUrl(imageUrl);
        return s3Client.getObjectAsBytes(GetObjectRequest.builder()
                .bucket(s3Buckets.getUser())
                .key(key)
                .build()).asByteArray();
    }

    public void deleteFile(String imageUrl) {
        String key = extractKeyFromUrl(imageUrl);
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(s3Buckets.getUser())
                .key(key)
                .build());
    }

    public String extractKeyFromUrl(String imageUrl) {
        return imageUrl.substring(imageUrl.indexOf(IMAGE_FOLDER));
    }

    public void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty() || !file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed.");
        }
    }
}
