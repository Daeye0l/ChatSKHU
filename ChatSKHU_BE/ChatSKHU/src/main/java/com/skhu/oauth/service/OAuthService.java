package com.skhu.oauth.service;


import com.skhu.oauth.dto.OAuthDto;

public interface OAuthService {

    OAuthDto.LoginResponse getAccessToken(String code);
    OAuthDto.UserResponse getUserInfo(String accessToken);

}
