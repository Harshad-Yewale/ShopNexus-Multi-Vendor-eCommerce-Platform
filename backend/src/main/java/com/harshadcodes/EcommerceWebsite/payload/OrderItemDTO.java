package com.harshadcodes.EcommerceWebsite.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {
    private String productId;
    private String productName;
    private String productPrice;
    private String productImage;
    private String productDescription;
    private Integer quantity;
    private Long sellerId;
    private double discount;
    private double orderedProductPrice;
}
