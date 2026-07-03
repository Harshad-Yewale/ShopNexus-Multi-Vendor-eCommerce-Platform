package com.harshadcodes.EcommerceWebsite.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayOrderResponse {

    private Long orderId;

    private String gatewayOrderId;

    private String key;

    private Long amount;

    private String currency;
}