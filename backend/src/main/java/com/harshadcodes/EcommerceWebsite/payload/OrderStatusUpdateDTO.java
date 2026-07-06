package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.model.OrderStatus;

public record OrderStatusUpdateDTO(
        OrderStatus status
) {
}
