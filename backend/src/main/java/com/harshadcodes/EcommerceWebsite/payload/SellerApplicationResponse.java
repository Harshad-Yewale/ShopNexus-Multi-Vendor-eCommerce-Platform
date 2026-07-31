package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.model.ApplicationStatus;

import java.time.LocalDateTime;

public record SellerApplicationResponse(
        Long id,
        String username,
        String email,
        String businessName,
        String businessDescription,
        String address,
        String csNumber,
        ApplicationStatus status,
        LocalDateTime createdAt
) {
}
