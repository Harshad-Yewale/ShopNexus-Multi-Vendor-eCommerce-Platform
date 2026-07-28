package com.harshadcodes.EcommerceWebsite.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "pending_user_Registration")
public class PendingUserRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Exclude
    @Column(name = "pending_user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private LocalDateTime otpExpiry;

    @Column(nullable = false)
    private Integer attempts = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;


}
