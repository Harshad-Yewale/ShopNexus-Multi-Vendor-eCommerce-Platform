package com.harshadcodes.EcommerceWebsite.payload;

import java.util.List;

public record SellerResponse (
        List<SellerDTO> content,
        Integer pageNumber,
        Integer pageSize,
        Integer totalPages,
        Long totalElements,
        boolean lastPage
) {

}
