package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.model.ApplicationStatus;

public record UpdateSellerApplicationRequest(
        ApplicationStatus status,
        String adminRemarks
) {}
