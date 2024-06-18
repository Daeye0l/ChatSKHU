package com.skhu.oauth.controller;

import com.skhu.oauth.dto.OAuthDto;
import com.skhu.oauth.dto.UserDto;
import com.skhu.oauth.service.KakaoOAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
@Tag(name = "OAuthController", description = "소셜 로그인 관련 API")
public class OAuthController {

    private final KakaoOAuthService kakaoOAuthService;

    @GetMapping("kakao/callback")
    @Operation(
            summary = "카카오 토큰 발급",
            description = "카카오 로그인 후 redirect URL로 쓰는 API" +
                    "카카오 로그인 버튼에 들어갈 URL https://kauth.kakao.com/oauth/authorize?client_id=6d70836eca9601d56fe3b7b7d3628840&redirect_uri=http://chatskhu.duckdns.org/oauth/kakao/callback&response_type=code")
    public ResponseEntity<OAuthDto.LoginResponse> kakaoCallback(@RequestParam("code") String code) {
        return ResponseEntity.ok(kakaoOAuthService.getAccessToken(code));
    }

    @Operation(
            summary = "카카오 토큰으로 로그인",
            description = "첫 로그인 시 카카오 사용자 정보 데이터베이스에 저장")
    @PostMapping("kakao/login")
    public ResponseEntity<UserDto.LoginResponse> kakaoLogin(@RequestBody OAuthDto.KakaoLoginRequest request){
        return ResponseEntity.ok(kakaoOAuthService.login(request.getAccessToken()));
    }


}