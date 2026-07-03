package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.*;
import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.payload.OrderItemDTO;
import com.harshadcodes.EcommerceWebsite.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;
    private final ModelMapper modelMapper;


    @Transactional
    @Override
    public OrderDTO createPendingOrder(String email, Long addressId) throws Exception {

        Cart cart = cartRepository.findCartByEmail(email);

        if (cart == null) {
            throw new ResourceNotFoundException("Cart", "email", email);
        }

        if (!cart.getUser().getEmail().equals(email)) {
            throw new Exception("Unauthorized Access");
        }

        if (cart.getCartItems().isEmpty()) {
            throw new Exception("Cart is empty");
        }

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address", "addressId", addressId));


        Payment payment = new Payment();
        payment.setGatewayName("RAZORPAY");
        payment.setPaymentMethod("ONLINE");
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setAmount(cart.getTotalPrice());

        Payment savedPayment = paymentRepository.save(payment);

        Order order = new Order();

        order.setEmail(email);
        order.setAddress(address);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
        order.setPayment(savedPayment);

        Order savedOrder = orderRepository.save(order);

        savedPayment.setOrder(savedOrder);
        paymentRepository.save(savedPayment);

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setOrderItemQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
            orderItems.add(orderItem);
        }

        orderItems = orderItemRepository.saveAll(orderItems);
        savedOrder.setOrderItems(orderItems);

        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderDTO.setOrderItems(new ArrayList<>());
        orderItems.forEach(orderItem ->{
            OrderItemDTO orderItemDTO = modelMapper.map(orderItem, OrderItemDTO.class);
            orderItemDTO.setOrderedProductPrice(orderItem.getDiscountedPrice());
            orderItemDTO.setOrderedProductPrice(orderItem.getDiscountedPrice());
            orderDTO.getOrderItems().add(orderItemDTO);
            return;
                });

        orderDTO.setAddressId(addressId);
        return orderDTO;
    }
}
