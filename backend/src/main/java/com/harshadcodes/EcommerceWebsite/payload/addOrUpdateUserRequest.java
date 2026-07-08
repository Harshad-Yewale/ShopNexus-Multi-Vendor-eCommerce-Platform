package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.constants.AppRole;

public record addOrUpdateUserRequest(
        String username,
        String email,
        String password,
        AppRole role
) {
}
