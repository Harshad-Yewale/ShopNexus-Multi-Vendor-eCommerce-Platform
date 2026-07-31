package com.harshadcodes.EcommerceWebsite.payload;

import java.util.List;

public record SellerApplicationResponseList(
        List<SellerApplicationResponse> sellerApplicationResponseList,
         Integer pageNumber,
         Integer pageSize,
         Long totalElements,
         Integer totalPages,
         boolean isLastPage
) {
}
