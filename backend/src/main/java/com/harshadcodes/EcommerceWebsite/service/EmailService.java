package com.harshadcodes.EcommerceWebsite.service;


import com.harshadcodes.EcommerceWebsite.exceptions.EmailException;
import com.harshadcodes.EcommerceWebsite.model.SellerApplication;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService{

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.sender.email}")
    private String fromMail;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String BREVO_URL =
            "https://api.brevo.com/v3/smtp/email";

    public void sendWelcomeMail(String toEmail, String name) {

        try {

            ClassPathResource resource = new ClassPathResource("templates/welcome-email.html");

            String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            html = html.replace("{{name}}", name);
            html = html.replace("{{appName}}", "ShopNexus");
            html = html.replace("{{year}}", "2026");

            sendEmail(
                    toEmail,
                    name,
                    "Welcome To ShopNexus",
                    html
            );
        } catch (Exception e) {
            throw new EmailException("Failed to send Welcome email",e);
        }
    }
/*
    public void sendResetOtp(String toEmail, String name, String otp) {
        try {
            ClassPathResource resource = new ClassPathResource("templates/ResetOtp-email.html");
            String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            html = html.replace("{{appName}}", "ShopNexus");
            html = html.replace("{{name}}", name);
            html = html.replace("{{otp}}", otp);

            sendEmail(
                    toEmail,
                    name,
                    "ShopNexus Reset OTP",
                    html
            );

        } catch (Exception e) {
            throw new EmailException("Failed to send Reset OTP email", e);
        }
    }*/
    public void sendVerifyOtp(String toEmail, String name, String otp) {

        try {
            ClassPathResource resource = new ClassPathResource("templates/VerifyOtp-email.html");
            String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            html = html.replace("{{appName}}", "ShopNexus");
            html = html.replace("{{name}}", name);
            html = html.replace("{{otp}}", otp);

            sendEmail(
                    toEmail,
                    name,
                    "ShopNexus OTP Email",
                    html
            );

        } catch (Exception e) {
            throw new EmailException("Failed to send Verify OTP email", e);
        }
    }


    public void sendSellerApplicationApprovedMail(SellerApplication application, String s) {
        try {
            ClassPathResource resource = new ClassPathResource("templates/seller-approved.html");
            String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            html = html.replace("{{name}}", application.getUser().getUsername());
            html = html.replace("{{businessName}}", application.getBusinessName());
            html = html.replace("{{adminRemarks}}",
                    application.getAdminRemarks() == null
                            ? "No remarks provided."
                            : application.getAdminRemarks());
            html = html.replace(
                    "{{dashboardUrl}}",
                    "https://your-frontend-url/seller/dashboard"
            );
            html = html.replace("{{appName}}", "ShopNexus");
            html = html.replace("{{year}}", "2026");

            sendEmail(
                    application.getUser().getEmail(),
                    application.getUser().getUsername(),
                    "Your Seller Application Has Been Approved",
                    html
            );

        } catch (Exception e) {
            throw new EmailException("Failed to send seller approval email", e);
        }
    }

    public void sendSellerApplicationRejectedMail(SellerApplication application, String s) {

        try {

            ClassPathResource resource = new ClassPathResource("templates/seller-rejected.html");
            String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            html = html.replace("{{name}}", application.getUser().getUsername());
            html = html.replace("{{businessName}}", application.getBusinessName());
            html = html.replace("{{adminRemarks}}",
                    application.getAdminRemarks() == null
                            ? "No remarks provided."
                            : application.getAdminRemarks());
            html = html.replace("{{supportEmail}}", fromMail);
            html = html.replace("{{appName}}", "ShopNexus");
            html = html.replace("{{year}}", "2026");
            sendEmail(
                    application.getUser().getEmail(),
                    application.getUser().getUsername(),
                    "Update on Your Seller Application",
                    html
            );

        } catch (Exception e) {
            throw new EmailException("Failed to send seller rejection email", e);
        }
    }

    public void sendSellerApplicationSubmittedMail(SellerApplication application) {

            try {

                ClassPathResource resource = new ClassPathResource("templates/seller-application-submitted.html");
                String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

                html = html.replace("{{name}}", application.getUser().getUsername());
                html = html.replace("{{businessName}}", application.getBusinessName());
                html = html.replace("{{appName}}", "ShopNexus");
                html = html.replace("{{year}}", "2026");
                html = html.replace("{{supportEmail}}", fromMail);

                sendEmail(
                        application.getUser().getEmail(),
                        application.getUser().getUsername(),
                        "Your Seller Application Has Been Received",
                        html
                );

            } catch (Exception e) {
                throw new EmailException("Failed to send seller application submitted email", e);
            }
        }

    private void sendEmail(String toEmail, String toName, String subject, String htmlContent) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", brevoApiKey);

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of(
                        "name", "ShopNexusTeam",
                        "email", fromMail
                ),
                "to", List.of(
                        Map.of(
                                "email", toEmail,
                                "name", toName
                        )
                ),
                "subject", subject,
                "htmlContent", htmlContent
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        restTemplate.postForEntity(
                BREVO_URL,
                request,
                String.class
        );
    }
}