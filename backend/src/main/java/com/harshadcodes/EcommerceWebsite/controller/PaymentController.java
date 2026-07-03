package com.harshadcodes.EcommerceWebsite.controller;

import com.harshadcodes.EcommerceWebsite.payload.RazorpayOrderResponse;
import com.harshadcodes.EcommerceWebsite.payload.VerifyPaymentRequest;
import com.harshadcodes.EcommerceWebsite.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    @PostMapping("/create-order/{orderId}")
    public ResponseEntity<RazorpayOrderResponse> createRazorpayOrder(@PathVariable Long orderId) throws Exception {

        RazorpayOrderResponse response = paymentService.createRazorpayOrder(orderId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@Valid @RequestBody VerifyPaymentRequest request)
            throws Exception {
        paymentService.verifyPayment(
                request.orderId(),
                request.gatewayOrderId(),
                request.gatewayPaymentId(),
                request.gatewaySignature()
        );
        return ResponseEntity.ok("Payment Verified Successfully");
    }

}