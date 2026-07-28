package com.harshadcodes.EcommerceWebsite.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record VerifyUserRegistrationDTO(

        @Email
        @NotBlank (message = "email should not be empty")
        String email,

        @NotBlank(message = "otp should not be empty")
        @Size(min = 6,max = 6, message = "Otp should be only 4 digits")
        String otp
) {
}
