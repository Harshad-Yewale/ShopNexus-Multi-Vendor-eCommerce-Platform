package com.harshadcodes.EcommerceWebsite.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SellerApplicationRequest(
        @NotBlank(message = "business name is required")
        String businessName,

        @Size(max = 2000, message = "Description is too large")
        String businessDescription,

        @NotBlank(message = "Address is required")
        String address,

        @NotBlank(message ="customer support number is required" )
        @Pattern(regexp = "^[0-9]{10}$",
                message = "Enter valid phone number")
        String csNumber

) {
}
