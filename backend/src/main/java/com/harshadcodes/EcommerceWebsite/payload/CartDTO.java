package com.harshadcodes.EcommerceWebsite.payload;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CartDTO {
     Long cartId;

     Double totalPrice=0.0;

     List<ProductDTO> productDTOs;
}
