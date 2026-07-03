package com.harshadcodes.EcommerceWebsite.controller;

import com.harshadcodes.EcommerceWebsite.payload.CreateOrderRequest;
import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.service.OrderService;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final AuthUtils authUtils;

    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createOrder(@Valid @RequestBody CreateOrderRequest request)
            throws Exception {

        String email = authUtils.getLoggedinEmail();
        OrderDTO orderDTO = orderService.createPendingOrder(email,request.addressId());

        return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
    }
}