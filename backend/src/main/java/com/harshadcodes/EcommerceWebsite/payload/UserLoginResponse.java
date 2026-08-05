package com.harshadcodes.EcommerceWebsite.payload;

import org.springframework.http.ResponseCookie;

public record UserLoginResponse(
        UserInfoResponse response,
        ResponseCookie token
) {
}
