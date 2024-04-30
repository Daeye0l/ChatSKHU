package com.skhu.controller;

import com.skhu.domain.User;
import com.skhu.dto.OAuthDto;
import com.skhu.dto.UserDto;
import com.skhu.service.GoogleOAuthService;
import com.skhu.service.KakaoOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {

    private final KakaoOAuthService kakaoOAuthService;

    private final GoogleOAuthService googleOAuthService;

    @GetMapping("kakao/callback")
    public ResponseEntity<OAuthDto.LoginResponse> kakaoCallback(@RequestParam String code) {
        return ResponseEntity.ok(kakaoOAuthService.getAccessToken(code));
    }

    @PostMapping("kakao/user")
    public ResponseEntity<OAuthDto.UserResponse> kakaoUser(@RequestParam String accessToken) {
        return ResponseEntity.ok(kakaoOAuthService.getUserInfo(accessToken));
    }

    @PostMapping("kakao/login")
    public ResponseEntity<UserDto.LoginResponse> kakaoLogin(@RequestBody OAuthDto.KakaoLoginRequest request){
        return ResponseEntity.ok(kakaoOAuthService.login(request.getAccessToken()));
    }


    @GetMapping("google/callback")
    public ResponseEntity<OAuthDto.LoginResponse> googleCallback(@RequestParam String code) {
        return ResponseEntity.ok(googleOAuthService.getAccessToken(code));
    }

    @PostMapping("google/user")
    public ResponseEntity<OAuthDto.UserResponse> googleUser(@RequestParam String accessToken) {
        return ResponseEntity.ok(googleOAuthService.getUserInfo(accessToken));
    }

}