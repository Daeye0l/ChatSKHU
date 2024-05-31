package com.skhu.oauth.dto;


import com.skhu.oauth.domain.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

public class OAuthDto {

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginResponse {

        private String accessToken;

        private String refreshToken;

    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UserResponse {

        private String socialUid;

        private String socialType;

        private String email;

        private String nickname;

        private String imageUrl;

        private UserRole userRole;

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginRequest {

        private String socialUid;

        @NotBlank(message = "소셜 타입이 필요합니다. (관리자 문의)")
        private String socialType;

        @NotBlank(message = "이메일 주소를 입력해주세요.")
        @Email(message = "정확한 이메일 주소를 입력해주세요.")
        private String email;

        @NotBlank(message = "닉네임을 입력해주세요.")
        @Size(min = 2, max = 10, message = "닉네임은 2자 이상 10자 이하로 입력해주세요.")
        private String nickname;

    }
    @Data
    public static class KakaoLoginRequest{
        private String accessToken;
    }

}
