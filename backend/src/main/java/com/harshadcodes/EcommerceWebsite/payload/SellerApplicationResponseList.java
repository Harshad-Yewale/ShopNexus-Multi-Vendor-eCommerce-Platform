package com.harshadcodes.EcommerceWebsite.payload;

import java.util.List;

public record SellerApplicationResponseList(
        List<SellerApplicationResponse> content,
         Integer pageNumber,
         Integer pageSize,
         Long totalElements,
         Integer totalPages,
         boolean isLastPage
) {
}
