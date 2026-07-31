package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.model.ApplicationStatus;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationRequest;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationResponse;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationResponseList;
import com.harshadcodes.EcommerceWebsite.payload.UpdateSellerApplicationRequest;
import jakarta.validation.Valid;

public interface SellerApplicationService {
    String applyForSeller(@Valid SellerApplicationRequest request);

    SellerApplicationResponseList getAllApplications(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    SellerApplicationResponseList getMyApplication();

    String modifyApplication(Long id,UpdateSellerApplicationRequest request);
}
