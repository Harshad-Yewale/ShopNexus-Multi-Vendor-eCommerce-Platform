package com.harshadcodes.EcommerceWebsite.repositories;

import com.harshadcodes.EcommerceWebsite.model.PendingUserRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PendingUserRegistrationRepository extends JpaRepository<PendingUserRegistration, Long> {

    Optional<PendingUserRegistration> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteByEmail(String email);
}