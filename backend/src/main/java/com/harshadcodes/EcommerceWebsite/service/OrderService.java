package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.model.OrderStatus;
import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.payload.OrderResponse;


public interface OrderService {

    OrderDTO createPendingOrder(String email, Long addressId) throws Exception;

    OrderResponse findAllOrders(Integer pageNumber, Integer pageSize, String sortOrder, String sortBy, String keyword);

    OrderDTO updateOrder(Long orderId, OrderStatus status);

    OrderResponse findAllOrdersBySeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword);
}
