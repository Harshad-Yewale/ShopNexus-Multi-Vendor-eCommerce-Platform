package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.payload.CloudinaryImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface FilesService {
    public CloudinaryImageResponse uploadImage(MultipartFile image) throws IOException;

    void deleteImage(String productImagePublicId) throws IOException;
}
