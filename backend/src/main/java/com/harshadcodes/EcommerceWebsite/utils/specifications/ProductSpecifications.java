package com.harshadcodes.EcommerceWebsite.utils.specifications;

import com.harshadcodes.EcommerceWebsite.model.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecifications {


    public static Specification<Product> productSpecificationByName(String cleanedName) {

        return (root, criteriaQuery, criteriaBuilder) -> {

           var cleanedNameFromDB= criteriaBuilder.function(
                    "regexp_replace",
                    String.class,
                   criteriaBuilder.lower(root.get("productName")),
                   criteriaBuilder.literal("[^a-z0-9 ]"),
                   criteriaBuilder.literal(""),
                   criteriaBuilder.literal("g")
            );

            return criteriaBuilder.like(cleanedNameFromDB, "%" + cleanedName + "%");

        };
    }
    public static Specification<Product> productSpecificationByCategory(String category) {
        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.like(root.get("category").get("categoryName"), category);
    }

    public static Specification<Product> productSpecificationForSeller(Long sellerId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user").get("id"), sellerId);
    }
}
