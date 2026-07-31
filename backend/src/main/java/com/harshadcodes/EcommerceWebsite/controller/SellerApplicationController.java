package com.harshadcodes.EcommerceWebsite.controller;


import com.harshadcodes.EcommerceWebsite.constants.AppConstants;
import com.harshadcodes.EcommerceWebsite.model.ApplicationStatus;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationRequest;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationResponse;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationResponseList;
import com.harshadcodes.EcommerceWebsite.payload.UpdateSellerApplicationRequest;
import com.harshadcodes.EcommerceWebsite.service.SellerApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class SellerApplicationController {

    private final SellerApplicationService sellerApplicationService;

    @PostMapping("/public/apply-seller")
    public ResponseEntity<String> sellerApplication (@Valid @RequestBody SellerApplicationRequest request){
        String response= sellerApplicationService.applyForSeller(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/admin/get_all_applications")
    public ResponseEntity<SellerApplicationResponseList> getAllApplications(
            @RequestParam(name = "pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = AppConstants.SORT_APPLICATION_BY,required = false)String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = AppConstants.SORT_ORDER_DESC,required = false)String sortOrder,
            @RequestParam(name = "keyword", required = false) String keyword
    ){
        SellerApplicationResponseList applications= sellerApplicationService.getAllApplications(pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/public/get_my_application")
    public ResponseEntity<SellerApplicationResponseList> getMyApplication(){
        SellerApplicationResponseList response = sellerApplicationService.getMyApplication();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/admin/modify_application")
    public ResponseEntity<String> modifyApplication(@RequestParam(name = "id")Long id,
                                                    @Valid @RequestBody UpdateSellerApplicationRequest request){
        String response = sellerApplicationService.modifyApplication(id,request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



}
