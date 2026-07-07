package com.harshadcodes.EcommerceWebsite.utils.specifications;

import com.harshadcodes.EcommerceWebsite.model.Order;
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

}
