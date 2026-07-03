package com.harshadcodes.EcommerceWebsite.payload;

import com.harshadcodes.EcommerceWebsite.model.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {

    private Long paymentId;

    private String gatewayName;

    private String paymentMethod;

    private PaymentStatus paymentStatus;

    private BigDecimal amount;

    private String gatewayOrderId;

    private String gatewayPaymentId;

    private String gatewaySignature;

    private String responseMessage;

    private LocalDateTime paymentDate;
}