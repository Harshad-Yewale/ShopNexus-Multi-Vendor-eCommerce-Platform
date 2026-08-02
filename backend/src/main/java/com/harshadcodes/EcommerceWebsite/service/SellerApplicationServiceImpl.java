package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.constants.AppRole;
import com.harshadcodes.EcommerceWebsite.exceptions.DefaultException;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.ApplicationStatus;
import com.harshadcodes.EcommerceWebsite.model.Role;
import com.harshadcodes.EcommerceWebsite.model.SellerApplication;
import com.harshadcodes.EcommerceWebsite.model.User;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationRequest;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationResponse;
import com.harshadcodes.EcommerceWebsite.payload.SellerApplicationResponseList;
import com.harshadcodes.EcommerceWebsite.payload.UpdateSellerApplicationRequest;
import com.harshadcodes.EcommerceWebsite.repositories.RoleRepository;
import com.harshadcodes.EcommerceWebsite.repositories.SellerApplicationRepository;
import com.harshadcodes.EcommerceWebsite.repositories.UserRepository;
import com.harshadcodes.EcommerceWebsite.security.jwt.JwtUtils;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerApplicationServiceImpl implements SellerApplicationService {

    private final SellerApplicationRepository sellerApplicationRepository;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final HttpServletRequest httpServletRequest;
    private final ModelMapper modelMapper;
    private final EmailService emailService;
    private final AuthUtils authUtils;
    private final RoleRepository roleRepository;

    @Override
    public String applyForSeller(SellerApplicationRequest request) {

        User user = authUtils.getLoggedinUser();

        boolean isSeller = user.getUserRoles()
                .stream()
                .anyMatch(role -> role.getRole().equals(AppRole.ROLE_SELLER));

        if (isSeller) {
            throw new DefaultException("You are already a seller.");
        }

        boolean alreadyApplied = sellerApplicationRepository.existsByUserAndStatus(user, ApplicationStatus.PENDING);

        if (alreadyApplied) {
            throw new DefaultException("You already have a pending seller application.");
        }

        SellerApplication application = new SellerApplication();

        application.setBusinessName(request.businessName());
        application.setBusinessDescription(request.businessDescription());
        application.setAddress(request.address());
        application.setCsNumber(request.csNumber());
        application.setStatus(ApplicationStatus.PENDING);
        application.setUser(user);

        sellerApplicationRepository.save(application);
        emailService.sendSellerApplicationSubmittedMail(application);

        return "Seller application submitted successfully.";
    }

    @Override
    public SellerApplicationResponseList getAllApplications(
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortOrder) {

        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<SellerApplication> applicationPage = sellerApplicationRepository.findAll(pageable);

        List<SellerApplicationResponse> responses = applicationPage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return new SellerApplicationResponseList(
                responses,
                applicationPage.getNumber(),
                applicationPage.getSize(),
                applicationPage.getTotalElements(),
                applicationPage.getTotalPages(),
                applicationPage.isLast()
        );
    }

    @Override
    public SellerApplicationResponseList getMyApplication() {

        User user = authUtils.getLoggedinUser();

        List<SellerApplication> applications = sellerApplicationRepository.findByUserOrderByCreatedAtDesc(user);

        List<SellerApplicationResponse> responses = applications.stream()
                        .map(this::mapToResponse)
                        .toList();

        return new SellerApplicationResponseList(
                responses,
                0,
                responses.size(),
                (long) responses.size(),
                1,
                true
        );
    }

    @Override
    @Transactional
    public String modifyApplication(Long id,UpdateSellerApplicationRequest request) {

        SellerApplication application = sellerApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seller Application", "id", id));

        // Prevent duplicate action
        if (application.getStatus().name().equals(request.status().name())) {
            throw new DefaultException("Application is already " + request.status().name());
        }

        // Prevent changing an approved/rejected application
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new DefaultException("only pending applications can be modified.");
        }
        application.setStatus(request.status());

        if (request.status() == ApplicationStatus.APPROVED) {

            User user = application.getUser();
            Role sellerRole = roleRepository.findByRole(AppRole.ROLE_SELLER)
                    .orElseThrow(() -> new ResourceNotFoundException("Role", "role", AppRole.ROLE_SELLER.name()));

            user.getUserRoles().add(sellerRole);
            user.setBusinessName(application.getBusinessName());
            user.setBusinessDescription(application.getBusinessDescription());
            user.setBusinessAddress(application.getAddress());
            user.setCsNumber(application.getCsNumber());
            userRepository.save(user);

            application.setAdminRemarks(request.adminRemarks());
            emailService.sendSellerApplicationApprovedMail(application,request.adminRemarks());

        } else {

            application.setAdminRemarks(request.adminRemarks());
            emailService.sendSellerApplicationRejectedMail(application,request.adminRemarks());
        }
        sellerApplicationRepository.save(application);
        return "Application updated successfully.";
    }


    private void sendAcceptanceMail(SellerApplication sellerApplication, String s) {

    }


    private void sendRejectionMail(SellerApplication sellerApplication, String s) {

    }


    private void sendAppliedSuccessfullyMail(SellerApplication sellerApplication) {

    }

    private SellerApplicationResponse mapToResponse(SellerApplication application) {

        return new SellerApplicationResponse(
                application.getId(),
                application.getUser().getUsername(),
                application.getUser().getEmail(),
                application.getBusinessName(),
                application.getBusinessDescription(),
                application.getAddress(),
                application.getCsNumber(),
                application.getStatus(),
                application.getCreatedAt(),
                application.getAdminRemarks()

        );
    }
}
