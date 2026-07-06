package com.harshadcodes.EcommerceWebsite.payload;

import java.util.List;

public record OrderResponse(
        List<OrderDTO> content,
        Integer pageNumber,
        Integer pageSize,
        Integer totalPages,
        Long totalElements,
        boolean lastPage
) { }
