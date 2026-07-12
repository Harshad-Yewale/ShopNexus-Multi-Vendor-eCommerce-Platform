package com.harshadcodes.EcommerceWebsite.utils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class InsertImageUrl {


    @Value("${image.base.url}")
    private String imageBaseUrl;


    public String constructImageUrl(String imageName) {
        return imageBaseUrl.endsWith("/")
                ? imageBaseUrl + imageName
                : imageBaseUrl + "/" + imageName;
    }
}
