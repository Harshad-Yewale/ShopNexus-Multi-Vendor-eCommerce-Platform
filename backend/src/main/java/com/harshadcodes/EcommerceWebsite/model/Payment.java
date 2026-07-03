package com.harshadcodes.EcommerceWebsite.model;

import com.harshadcodes.EcommerceWebsite.model.Order;
import com.harshadcodes.EcommerceWebsite.model.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "payments_tbl")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @OneToOne(mappedBy = "payment")
    private Order order;

    private String gatewayName;

    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private Double amount;

    private String gatewayOrderId;

    private String gatewayPaymentId;

    private String gatewaySignature;

    private String responseMessage;

    private LocalDateTime paymentDate;
}