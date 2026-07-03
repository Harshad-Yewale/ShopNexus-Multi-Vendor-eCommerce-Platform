package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;


public interface OrderService {

    OrderDTO createPendingOrder(String email, Long addressId) throws Exception;
}
