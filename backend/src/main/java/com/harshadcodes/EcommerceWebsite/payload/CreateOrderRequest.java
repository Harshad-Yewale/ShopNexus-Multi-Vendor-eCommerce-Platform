package com.harshadcodes.EcommerceWebsite.payload;

import jakarta.validation.constraints.NotNull;

public record CreateOrderRequest(

        @NotNull(message = "Address Id is required")
        Long addressId

) {
}