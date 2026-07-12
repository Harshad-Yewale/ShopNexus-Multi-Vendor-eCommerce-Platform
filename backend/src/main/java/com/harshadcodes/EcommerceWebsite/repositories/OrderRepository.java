package com.harshadcodes.EcommerceWebsite.repositories;

import com.harshadcodes.EcommerceWebsite.model.Order;
import com.harshadcodes.EcommerceWebsite.model.OrderStatus;
import com.harshadcodes.EcommerceWebsite.payload.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query("""
       SELECT COUNT(o)
       FROM Order o
       WHERE o.orderStatus = :status
       """)
    Long getAllConfirmedOrders(@Param("status") OrderStatus status);

    @Query("""
       SELECT COALESCE(SUM(o.totalAmount), 0)
       FROM Order o
       WHERE o.orderStatus = :status
       """)
    Double getTotalRevenueOfConfirmedOrders(@Param("status") OrderStatus status);

        @Query("""
    SELECT new com.harshadcodes.EcommerceWebsite.payload.MonthlyRevenueDTO(
           MONTH(o.orderDate),
           COALESCE(SUM(o.totalAmount),0)
    )
    FROM Order o
    WHERE o.orderStatus = :status
    GROUP BY MONTH(o.orderDate)
    ORDER BY MONTH(o.orderDate)
    """)
    List<MonthlyRevenueDTO> getRevenuePerMonth(OrderStatus status);



            @Query("""
        SELECT new com.harshadcodes.EcommerceWebsite.payload.OrderStatusAnalyticsDTO(
               o.orderStatus,
               COUNT(o)
        )
        FROM Order o
        GROUP BY o.orderStatus
        """)
    List<OrderStatusAnalyticsDTO> getOrderStatusAnalytics();

            @Query("""
        SELECT new com.harshadcodes.EcommerceWebsite.payload.MonthlyAnalyticsDTO(
               MONTH(o.orderDate),
               COUNT(o)
        )
        FROM Order o
        GROUP BY MONTH(o.orderDate)
        ORDER BY MONTH(o.orderDate)
        """)
    List<MonthlyAnalyticsDTO> getOrdersPerMonth();

    Page<Order> findAll(Specification<Order> spec, Pageable pageDetails);

    Page<Order> findAllByEmail( String email,Pageable pageDetails);
}
