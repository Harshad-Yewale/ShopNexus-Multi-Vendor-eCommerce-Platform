package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.model.OrderStatus;
import com.harshadcodes.EcommerceWebsite.model.User;
import com.harshadcodes.EcommerceWebsite.payload.AdminAnalyticsResponse;
import com.harshadcodes.EcommerceWebsite.payload.MonthlyAnalyticsDTO;
import com.harshadcodes.EcommerceWebsite.payload.MonthlyRevenueDTO;
import com.harshadcodes.EcommerceWebsite.repositories.OrderRepository;
import com.harshadcodes.EcommerceWebsite.repositories.ProductRepository;
import com.harshadcodes.EcommerceWebsite.repositories.UserRepository;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;


@Service
    @RequiredArgsConstructor
    public class AnalyticsServiceImpl implements AnalyticsService {

        private final AuthUtils authUtils;
        private final UserRepository userRepository;
        private final ProductRepository productRepository;
        private final OrderRepository orderRepository;

        @Override
        public AdminAnalyticsResponse getAdminAnalytics() {

            User loggedInUser = authUtils.getLoggedinUser();

            if (loggedInUser == null) {
                throw new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "You are not logged in");
            }

            if (!authUtils.isAdmin()) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "You cannot access this resource");
            }

            Long totalUsers = userRepository.count();

            Long totalProducts = productRepository.count();

            Long totalConfirmedOrders =
                    orderRepository.getAllConfirmedOrders(OrderStatus.CONFIRMED);

            Double totalRevenue =
                    orderRepository.getTotalRevenueOfConfirmedOrders(OrderStatus.CONFIRMED);

            return new AdminAnalyticsResponse(

                    totalUsers,
                    totalProducts,
                    totalConfirmedOrders,
                    totalRevenue,

                    orderRepository.getRevenuePerMonth(OrderStatus.CONFIRMED),
                    orderRepository.getOrderStatusAnalytics(),
                    orderRepository.getOrdersPerMonth(),
                    userRepository.getUsersPerMonth()
            );
        }
}