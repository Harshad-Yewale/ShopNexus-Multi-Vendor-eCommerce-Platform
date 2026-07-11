package com.harshadcodes.EcommerceWebsite.utils.specifications;

import com.harshadcodes.EcommerceWebsite.model.Order;
import com.harshadcodes.EcommerceWebsite.model.OrderItem;
import com.harshadcodes.EcommerceWebsite.model.Product;
import com.harshadcodes.EcommerceWebsite.model.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecifications {

        public static Specification<Order> orderSpecificationByEmail(String keyword) {
            return (root, query, cb) -> {
                if (keyword == null || keyword.isBlank()) {
                    return cb.conjunction();
                }

                return cb.like(
                        cb.lower(root.get("email")),
                        "%" + keyword.toLowerCase().trim() + "%"
                );
            };
        }

        public static Specification<Order> belongsToSeller(Long sellerId) {
            return (root, query, cb) -> {
                query.distinct(true);
                Join<Order, OrderItem> orderItems = root.join("orderItems");
                Join<OrderItem, Product> product = orderItems.join("product");
                Join<Product, User> seller = product.join("user");
                return cb.equal(seller.get("id"), sellerId);
            };
        }

}
