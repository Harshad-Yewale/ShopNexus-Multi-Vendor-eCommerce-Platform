package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.*;
import com.harshadcodes.EcommerceWebsite.payload.OrderDTO;
import com.harshadcodes.EcommerceWebsite.payload.OrderItemDTO;
import com.harshadcodes.EcommerceWebsite.payload.OrderResponse;
import com.harshadcodes.EcommerceWebsite.repositories.*;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import com.harshadcodes.EcommerceWebsite.utils.specifications.OrderSpecifications;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
    private final ModelMapper modelMapper;
    private final AuthUtils authUtils;


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
         Double totalOrderAmount = BigDecimal.valueOf(cart.getTotalPrice())
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
        order.setTotalAmount(totalOrderAmount);
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

    @Override
    public OrderResponse findAllOrders(Integer pageNumber, Integer pageSize, String sortOrder, String sortBy, String keyword) {

        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Specification<Order> spec = Specification.unrestricted();

        return getOrderResponse(keyword, pageDetails, spec);
    }

    @Override
    public OrderDTO updateOrder(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order","orderId",orderId));
        order.setOrderStatus(status);
        orderRepository.save(order);
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public OrderResponse findAllOrdersBySeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword) {
        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Long sellerId = authUtils.getLoggedinUserId();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Specification<Order> spec = Specification.where(OrderSpecifications.belongsToSeller(sellerId));

        return getOrderResponse(keyword, pageDetails, spec);
    }

    @NonNull
    private OrderResponse getOrderResponse(String keyword, Pageable pageDetails, Specification<Order> spec) {
        if (keyword != null && !keyword.trim().isEmpty()) {

            keyword = keyword.toLowerCase().trim();
            String[] words = keyword.split("\\s+");

            for (String word : words) {
                spec = spec.and(OrderSpecifications.orderSpecificationByEmail(word));
            }
        }
        Page<Order> pageOrders ;
        if(spec != null){
            pageOrders = orderRepository.findAll(spec, pageDetails);
        }else{
            pageOrders = orderRepository.findAll(pageDetails);
        }


        List<OrderDTO> orderDTOs =pageOrders.getContent()
                .stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
        return new OrderResponse(
                orderDTOs,
                pageOrders.getNumber(),
                pageOrders.getSize(),
                pageOrders.getTotalPages(),
                pageOrders.getTotalElements(),
                pageOrders.isLast()
        );
    }
}
