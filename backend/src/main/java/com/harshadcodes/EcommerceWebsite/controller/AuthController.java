package com.harshadcodes.EcommerceWebsite.controller;


import com.harshadcodes.EcommerceWebsite.constants.AppConstants;
import com.harshadcodes.EcommerceWebsite.payload.*;
import com.harshadcodes.EcommerceWebsite.security.jwt.JwtUtils;
import com.harshadcodes.EcommerceWebsite.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?>authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        UserInfoResponse response=authService.SignIn(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE,response.token()).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> createUser(@Valid @RequestBody SignupRequest signupRequest){
        SignupResponse response= authService.signUp(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signoutUser(){
        ResponseCookie cookie = authService.logoutUser();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been signed out!");
    }

    @GetMapping("/admin/sellers")
    public ResponseEntity<SellerResponse> getAllSellers(
            @RequestParam(name = "pageNumber",required = false,defaultValue = AppConstants.PAGE_NUMBER)Integer pageNumber,
            @RequestParam(name = "pageSize",required = false,defaultValue = AppConstants.PAGE_SIZE)Integer pageSize,
            @RequestParam(name = "sortBy",required = false,defaultValue = AppConstants.SORT_USER_BY)String sortBy,
            @RequestParam(name = "sortOrder",required = false,defaultValue = AppConstants.SORT_ORDER)String sortOrder
    ){
        SellerResponse sellers=authService.getAllSellers(pageNumber,pageSize,sortBy,sortOrder);
        return  ResponseEntity.status(HttpStatus.OK).body(sellers);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<String> addUser(@Valid @RequestBody addOrUpdateUserRequest userRequest){
        String response=authService.addUser(userRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PutMapping("/admin/update/{user_id}")
    public ResponseEntity<String> updateUser(
            @PathVariable(name = "user_id")Long userId,
            @Valid @RequestBody addOrUpdateUserRequest userRequest){
        String response=authService.updateUser(userId,userRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }




}
