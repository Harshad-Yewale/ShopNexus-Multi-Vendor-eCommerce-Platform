package com.harshadcodes.EcommerceWebsite.utils;

import com.harshadcodes.EcommerceWebsite.constants.AppRole;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.User;
import com.harshadcodes.EcommerceWebsite.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthUtils {

    private final UserRepository userRepository;

    public String getLoggedinEmail(){

        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(()-> {
                    return new ResourceNotFoundException("User","username", authentication.getName());
        });

        return user.getEmail();
    }

    public Long getLoggedinUserId(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(()-> {
                    return new ResourceNotFoundException("User","username", authentication.getName());
                });

        return user.getId();
    }

    public User  getLoggedinUser(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        User user=userRepository.findByUsername(authentication.getName())
                .orElseThrow(()-> {
            return new ResourceNotFoundException("User","username", authentication.getName());
        });
        return user;
    }

    public boolean isAdmin() {
        User user = getLoggedinUser();

        return user.getUserRoles()
                .stream()
                .anyMatch(role -> role.getRole() == AppRole.ROLE_ADMIN);
    }

    public boolean hasRole(User user , AppRole role){
        return user.getUserRoles().stream().anyMatch(
                userRole -> userRole.getRole() == role
        );
    }
}
