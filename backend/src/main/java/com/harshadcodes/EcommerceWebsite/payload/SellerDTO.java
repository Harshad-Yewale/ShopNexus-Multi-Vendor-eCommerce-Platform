package com.harshadcodes.EcommerceWebsite.payload;

import java.util.Set;

public record SellerDTO(
        Long id,
        String username,
        String email,
        Set<RoleDTO> roles,
        Set<ProductDTO> products
) {
}
