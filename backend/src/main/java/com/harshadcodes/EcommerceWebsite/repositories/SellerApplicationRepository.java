package com.harshadcodes.EcommerceWebsite.repositories;

import com.harshadcodes.EcommerceWebsite.model.ApplicationStatus;
import com.harshadcodes.EcommerceWebsite.model.SellerApplication;
import com.harshadcodes.EcommerceWebsite.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerApplicationRepository extends JpaRepository<SellerApplication,Long> {

    boolean existsByUserAndStatus(User user, ApplicationStatus applicationStatus);

    List<SellerApplication> findByUserOrderByCreatedAtDesc(User user);
}
