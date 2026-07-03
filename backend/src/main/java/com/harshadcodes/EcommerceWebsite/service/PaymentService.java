package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.payload.RazorpayOrderResponse;

public interface PaymentService {

    RazorpayOrderResponse createRazorpayOrder(Long orderId) throws Exception;

    OrderDTO verifyPayment(
            Long orderId,
            String gatewayOrderId,
            String gatewayPaymentId,
            String gatewaySignature
    ) throws Exception;

}