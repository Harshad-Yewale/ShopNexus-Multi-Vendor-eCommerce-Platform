package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.constants.AppRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record addOrUpdateUserRequest(

        String username,

        @Email
        String email,

        @Size(min =6,message = "Password must be at least 6 characters long")
        String currentPassword,

        @Size(min =6,message = "new Password must be at least 6 characters long")
        String newPassword,

        AppRole role
) {
}
