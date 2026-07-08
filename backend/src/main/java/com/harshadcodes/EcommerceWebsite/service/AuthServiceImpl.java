package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.constants.AppRole;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceAlreadyExistException;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.Role;
import com.harshadcodes.EcommerceWebsite.model.User;
import com.harshadcodes.EcommerceWebsite.payload.*;
import com.harshadcodes.EcommerceWebsite.repositories.RoleRepository;
import com.harshadcodes.EcommerceWebsite.repositories.UserRepository;
import com.harshadcodes.EcommerceWebsite.security.jwt.JwtUtils;
import com.harshadcodes.EcommerceWebsite.security.services.UserDetailsImpl;
import com.harshadcodes.EcommerceWebsite.utils.PaginationUtility;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{


    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserInfoResponse SignIn(LoginRequest loginRequest) {

        Authentication authentication;

        authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie cookie = jwtUtils.generateJwtFromCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new  UserInfoResponse(userDetails.getId(),
                userDetails.getUsername(), roles,cookie.toString());
    }

    @Override
    public SignupResponse signUp(SignupRequest signupRequest) {
        if(userRepository.existsByEmail(signupRequest.email())){
            throw new ResourceAlreadyExistException("User","email",signupRequest.email());
        }
        if(userRepository.existsByUsername(signupRequest.username())){
            throw new ResourceAlreadyExistException("User","username",signupRequest.username());
        }
        String encodedPassword=passwordEncoder.encode(signupRequest.password());
        User savedUser=new User(signupRequest.username(),signupRequest.email(),encodedPassword);

        Set<String> strRoles=signupRequest.roles();
        Set<Role> roles=new HashSet<>();

        if(strRoles==null){
            Role userRole=roleRepository.findByRole(AppRole.ROLE_USER).orElseThrow(()->new ResourceNotFoundException("Role","User",strRoles.toString()));
            roles.add(userRole);
        }
        else{
            strRoles.forEach(role->{
                    switch (role.toUpperCase()){

                        case "ADMIN":
                            Role adminRole=roleRepository.findByRole(AppRole.ROLE_ADMIN).orElseThrow(()->new ResourceNotFoundException("Role","User",AppRole.ROLE_ADMIN.name()));
                            roles.add(adminRole);
                            break;
                        case "SELLER":
                            Role sellerRole=roleRepository.findByRole(AppRole.ROLE_SELLER).orElseThrow(()->new ResourceNotFoundException("Role","User",AppRole.ROLE_SELLER.name()));
                            roles.add(sellerRole);
                            break;
                        default:
                            Role userRole=roleRepository.findByRole(AppRole.ROLE_USER).orElseThrow(()->new ResourceNotFoundException("Role","User",AppRole.ROLE_USER.name()));
                            roles.add(userRole);
                            break;
                    };
            });
        }
        savedUser.setUserRoles(roles);
        userRepository.save(savedUser);
        String message="registration was successful";
        String roleMessage="You are : "+savedUser.getUserRoles().toString();

       return  new SignupResponse(message,roleMessage);
    }

    @Override
    public SellerResponse getAllSellers(Integer pageNumber, Integer pageSize,
                                        String sortBy, String sortOrder) {

        Pageable pageDetails = PaginationUtility.createPageable(
                pageNumber, pageSize, sortBy, sortOrder);

        Page<User> sellerPage = userRepository.findByUserRole(AppRole.ROLE_SELLER, pageDetails);

        List<SellerDTO> sellerDTOs = sellerPage.getContent().stream()
                .map(seller -> {

                    Set<RoleDTO> roles = seller.getUserRoles().stream()
                            .map(role -> new RoleDTO(role.getRole()))
                            .collect(Collectors.toSet());

                    Set<ProductDTO> products = seller.getUserProducts().stream()
                            .map(product -> modelMapper.map(product, ProductDTO.class))
                            .collect(Collectors.toSet());

                    return new SellerDTO(
                            seller.getId(),
                            seller.getUsername(),
                            seller.getEmail(),
                            roles,
                            products);
                }).toList();

        return new SellerResponse(
                sellerDTOs,
                sellerPage.getNumber(),
                sellerPage.getSize(),
                sellerPage.getTotalPages(),
                sellerPage.getTotalElements(),
                sellerPage.isLast()
        );
    }



    @Override
    public ResponseCookie logoutUser() {
        return jwtUtils.getCleanJwtCookie();
    }

    @Override
    public String addUser(addOrUpdateUserRequest userRequest) {
        if(userRepository.existsByEmail(userRequest.email())){
            throw new ResourceAlreadyExistException("User","email",userRequest.email());
        }
        if(userRepository.existsByUsername(userRequest.username())){
            throw new ResourceAlreadyExistException("User","username",userRequest.username());
        }
        String encodedPassword=passwordEncoder.encode(userRequest.password());
        User savedUser=new User(userRequest.username(),userRequest.email(),encodedPassword);

        Set<Role> roles=new HashSet<>();

        if(userRequest.role() == AppRole.ROLE_SELLER){
            Role sellerRole=roleRepository.findByRole(AppRole.ROLE_SELLER).orElseThrow(()->new ResourceNotFoundException("Role","User",AppRole.ROLE_SELLER.name()));
            roles.add(sellerRole);
        }
        Role userRole=roleRepository.findByRole(AppRole.ROLE_USER).orElseThrow(()->new ResourceNotFoundException("Role","User",AppRole.ROLE_USER.name()));

        roles.add(userRole);
        savedUser.setUserRoles(roles);
        userRepository.save(savedUser);
        String message="registration was successful";
        return  message;
    }

    @Override
    public String updateUser(Long userId, addOrUpdateUserRequest userRequest) {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (!user.getUsername().equals(userRequest.username()) && userRepository.existsByUsername(userRequest.username())) {
            throw new ResourceAlreadyExistException("User", "username", userRequest.username());
        }

        if (!user.getEmail().equals(userRequest.email()) && userRepository.existsByEmail(userRequest.email())) {
            throw new ResourceAlreadyExistException("User", "email", userRequest.email());
        }

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByRole(AppRole.ROLE_USER).orElseThrow(() -> new ResourceNotFoundException("Role", "role", AppRole.ROLE_USER.name()));
        roles.add(userRole);

        if (userRequest.role() == AppRole.ROLE_SELLER) {
            Role sellerRole = roleRepository.findByRole(AppRole.ROLE_SELLER).orElseThrow(() -> new ResourceNotFoundException("Role", "role", AppRole.ROLE_SELLER.name()));
            roles.add(sellerRole);
        }
        String password = userRequest.password();

        if (password != null && !password.isBlank() && password.length() >= 6) {
            user.setPassword(passwordEncoder.encode(password));
        }

        user.setUsername(userRequest.username());
        user.setEmail(userRequest.email());
        user.setUserRoles(roles);
        userRepository.save(user);
        return "Updated successfully";
    }
}
