package com.harshadcodes.EcommerceWebsite.payload;

import java.util.List;

public record AdminAnalyticsResponse(

        Long totalUsers,
        Long totalProducts,
        Long totalConfirmedOrders,
        Double totalRevenue,
        List<MonthlyRevenueDTO> revenueChart,
        List<OrderStatusAnalyticsDTO> orderStatusChart,
        List<MonthlyAnalyticsDTO> ordersPerMonthChart,
        List<MonthlyAnalyticsDTO> usersPerMonthChart
) {
}
