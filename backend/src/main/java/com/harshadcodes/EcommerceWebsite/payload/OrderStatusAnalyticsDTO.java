package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.model.OrderStatus;

public record OrderStatusAnalyticsDTO(
        OrderStatus status,
        Long count
) {}