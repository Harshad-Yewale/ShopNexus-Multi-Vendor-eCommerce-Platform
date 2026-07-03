package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.payload.RazorpayOrderResponse;
import com.harshadcodes.EcommerceWebsite.repositories.*;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.Order;
import com.harshadcodes.EcommerceWebsite.model.OrderStatus;
import com.harshadcodes.EcommerceWebsite.model.Payment;
import com.harshadcodes.EcommerceWebsite.model.Cart;
import com.harshadcodes.EcommerceWebsite.model.OrderItem;
import com.harshadcodes.EcommerceWebsite.model.PaymentStatus;
import com.harshadcodes.EcommerceWebsite.model.Product;
import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.repositories.CartItemRepository;
import com.harshadcodes.EcommerceWebsite.repositories.CartRepository;
import com.harshadcodes.EcommerceWebsite.repositories.ProductRepository;
import com.razorpay.Utils;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

import jakarta.transaction.Transactional;
import org.json.JSONObject;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ModelMapper modelMapper;

    @Value("${razorpay.key}")
    private String razorpayKey;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    @Override
    public RazorpayOrderResponse createRazorpayOrder(Long orderId) throws Exception {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order", "orderId", orderId));

        if (order.getOrderStatus() != OrderStatus.PENDING_PAYMENT) {
            throw new IllegalStateException("Order is already paid or cancelled.");
        }

        JSONObject options = new JSONObject();

        long amount = Math.round(order.getTotalAmount() * 100);

        options.put("amount", amount);
        options.put("currency", "INR");
        options.put("receipt", "ORDER_" + order.getOrderId());

        com.razorpay.Order razorpayOrder =
                razorpayClient.orders.create(options);

        Payment payment = order.getPayment();

        payment.setGatewayOrderId(razorpayOrder.get("id"));

        paymentRepository.save(payment);

        return RazorpayOrderResponse.builder()
                .orderId(order.getOrderId())
                .gatewayOrderId(razorpayOrder.get("id"))
                .amount(amount)
                .currency("INR")
                .key(razorpayKey)
                .build();
    }

    @Transactional
    @Override
    public OrderDTO verifyPayment(
            Long orderId,
            String gatewayOrderId,
            String gatewayPaymentId,
            String gatewaySignature
    ) throws Exception {

        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                        new ResourceNotFoundException("Order", "orderId", orderId));

        Payment payment = order.getPayment();
        if (payment == null) {
            throw new Exception("Payment not found.");
        }

        if (!gatewayOrderId.equals(payment.getGatewayOrderId())) {
            throw new Exception("Invalid Razorpay Order Id.");
        }


        JSONObject json = new JSONObject();
        json.put("razorpay_order_id", gatewayOrderId);
        json.put("razorpay_payment_id", gatewayPaymentId);
        json.put("razorpay_signature", gatewaySignature);


        boolean verified = Utils.verifyPaymentSignature(json,razorpaySecret);

        if (!verified) {
            payment.setPaymentStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new Exception("Payment Signature Verification Failed.");
        }


        for (OrderItem orderItem : order.getOrderItems()) {

            Product product = productRepository.findById(orderItem.getProduct().getProductId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Product", "productId", orderItem.getProduct().getProductId()));

            if (product.getProductQuantity() < orderItem.getOrderItemQuantity()) {
                throw new Exception(product.getProductName() + " is out of stock.");
            }
        }

        for (OrderItem orderItem : order.getOrderItems()) {

            Product product = productRepository.findById(orderItem.getProduct().getProductId()).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Product",
                                    "productId",
                                    orderItem.getProduct().getProductId()));

            product.setProductQuantity(product.getProductQuantity() - orderItem.getOrderItemQuantity());
            productRepository.save(product);
        }


        Cart cart = cartRepository.findCartByEmail(order.getEmail());

        if (cart != null) {

            cartItemRepository.deleteAllByCartId(cart.getCartId());
            cart.setTotalPrice(0.0);
            cartRepository.save(cart);
        }


        payment.setGatewayPaymentId(gatewayPaymentId);
        payment.setGatewaySignature(gatewaySignature);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setResponseMessage("Payment done Successfully.");
        paymentRepository.save(payment);

        order.setOrderStatus(OrderStatus.CONFIRMED);
        orderRepository.save(order);
        OrderDTO dto = modelMapper.map(order, OrderDTO.class);
        dto.setAddressId(order.getAddress().getAddressId());
        return dto;
    }
}