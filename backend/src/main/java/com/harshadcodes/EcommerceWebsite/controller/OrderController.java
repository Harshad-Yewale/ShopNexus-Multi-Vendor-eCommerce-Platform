package com.harshadcodes.EcommerceWebsite.controller;

import com.harshadcodes.EcommerceWebsite.constants.AppConstants;
import com.harshadcodes.EcommerceWebsite.payload.CreateOrderRequest;
import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.payload.OrderResponse;
import com.harshadcodes.EcommerceWebsite.payload.OrderStatusUpdateDTO;
import com.harshadcodes.EcommerceWebsite.service.OrderService;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final AuthUtils authUtils;

    @PostMapping("/orders/create")
    public ResponseEntity<OrderDTO> createOrder(@Valid @RequestBody CreateOrderRequest request)
            throws Exception {

        String email = authUtils.getLoggedinEmail();
        OrderDTO orderDTO = orderService.createPendingOrder(email,request.addressId());

        return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<OrderResponse> getAllOrders(
            @RequestParam(name = "pageNumber",required = false,defaultValue = AppConstants.PAGE_NUMBER)Integer pageNumber,
            @RequestParam(name = "pageSize",required = false,defaultValue = AppConstants.PAGE_SIZE)Integer pageSize,
            @RequestParam(name = "sortBy",required = false,defaultValue = AppConstants.SORT_ORDER_BY)String sortBy,
            @RequestParam(name = "sortOrder",required = false,defaultValue = AppConstants.SORT_ORDER_DESC)String sortOrder,
            @RequestParam(name = "keyword", required = false) String keyword
    ) {

        OrderResponse response=orderService.findAllOrders(pageNumber,pageSize,sortOrder,sortBy,keyword);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/admin/orders/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long orderId,
                                                      @RequestBody OrderStatusUpdateDTO orderStatusUpdateDto) {
        OrderDTO order = orderService.updateOrder(orderId, orderStatusUpdateDto.status());
        return new ResponseEntity<OrderDTO>(order, HttpStatus.OK);
    }

    @GetMapping("/seller/orders")
    public ResponseEntity<OrderResponse> getAllSellerOrders(
            @RequestParam(name = "pageNumber",required = false,defaultValue = AppConstants.PAGE_NUMBER)Integer pageNumber,
            @RequestParam(name = "pageSize",required = false,defaultValue = AppConstants.PAGE_SIZE)Integer pageSize,
            @RequestParam(name = "sortBy",required = false,defaultValue = AppConstants.SORT_ORDER_BY)String sortBy,
            @RequestParam(name = "sortOrder",required = false,defaultValue = AppConstants.SORT_ORDER_DESC)String sortOrder,
            @RequestParam(name = "keyword", required = false) String keyword
            )
    {
        OrderResponse response = orderService.findAllOrdersBySeller(pageNumber,pageSize,sortBy,sortOrder,keyword);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PutMapping("/seller/orders/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatusBySeller(@PathVariable Long orderId,
                                                      @RequestBody OrderStatusUpdateDTO orderStatusUpdateDto) {
        OrderDTO order = orderService.updateOrder(orderId, orderStatusUpdateDto.status());
        return new ResponseEntity<OrderDTO>(order, HttpStatus.OK);
    }

    @GetMapping("/public/orders")
    public ResponseEntity<OrderResponse> getAllUserOrders(
            @RequestParam(name = "pageNumber",required = false,defaultValue = AppConstants.PAGE_NUMBER)Integer pageNumber,
            @RequestParam(name = "pageSize",required = false,defaultValue = AppConstants.PAGE_SIZE)Integer pageSize,
            @RequestParam(name = "sortBy",required = false,defaultValue = AppConstants.SORT_ORDER_BY)String sortBy,
            @RequestParam(name = "sortOrder",required = false,defaultValue = AppConstants.SORT_ORDER_DESC)String sortOrder
       ) {

        OrderResponse response=orderService.findAllUserOrders(pageNumber,pageSize,sortBy,sortOrder);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}