package com.harshadcodes.EcommerceWebsite.controller;

import com.harshadcodes.EcommerceWebsite.payload.AdminAnalyticsResponse;
import com.harshadcodes.EcommerceWebsite.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AnalyticsController {

     private final AnalyticsService analyticsService;

    @GetMapping("/admin/dashboard/analytics")
    public ResponseEntity<AdminAnalyticsResponse> getAdminAnalytics(){

        AdminAnalyticsResponse response=analyticsService.getAdminAnalytics();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }
}
