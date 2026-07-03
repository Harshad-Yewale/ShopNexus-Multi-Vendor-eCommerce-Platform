package com.harshadcodes.EcommerceWebsite.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VerifyPaymentRequest(

        @NotNull
        Long orderId,

        @NotBlank
        String gatewayOrderId,

        @NotBlank
        String gatewayPaymentId,

        @NotBlank
        String gatewaySignature

) {
}