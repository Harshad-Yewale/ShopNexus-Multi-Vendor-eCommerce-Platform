package com.harshadcodes.EcommerceWebsite.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.harshadcodes.EcommerceWebsite.payload.CloudinaryImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FilesService{

    private final Cloudinary cloudinary;

    @Override
    public CloudinaryImageResponse uploadImage(MultipartFile image) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.emptyMap()
                );

        return new CloudinaryImageResponse(
                uploadResult.get("secure_url").toString(),
                uploadResult.get("public_id").toString()
        );
    }

    @Override
    public void deleteImage(String productImagePublicId) throws IOException {
            cloudinary.uploader().destroy(
                    productImagePublicId,
                    ObjectUtils.emptyMap()
            );
        }
}
