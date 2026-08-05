package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.payload.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;

public interface AuthService {

    public UserLoginResponse SignIn(@Valid LoginRequest request);

    SignupResponse signUp(@Valid SignupRequest signupRequest);

    SellerResponse getAllSellers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ResponseCookie logoutUser();

    String addUser(addOrUpdateUserRequest userRequest);

    String updateUserRole(Long userId, @Valid addOrUpdateUserRequest userRequest);

    String updateUserUsername(@Valid addOrUpdateUserRequest userRequest);

    String updateUserPassword(@Valid addOrUpdateUserRequest userRequest) throws Exception;

    public void sendRegistrationOtp(PendingRegistrationRequestDTO request) throws Exception;

    public void verifyRegistrationOtp(VerifyUserRegistrationDTO request)throws Exception;

    UserInfoResponse getCurrentUser(Authentication authentication) throws Exception;
}
