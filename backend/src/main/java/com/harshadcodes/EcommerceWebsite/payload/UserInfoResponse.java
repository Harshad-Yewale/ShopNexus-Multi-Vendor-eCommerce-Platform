package com.harshadcodes.EcommerceWebsite.payload;

import java.time.LocalDateTime;
import java.util.List;

public record UserInfoResponse(
        Long id,
        String username,
        String email,
        LocalDateTime createdAt,
        List<String> roles,
        String token
) {
}
