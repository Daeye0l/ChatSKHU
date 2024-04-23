package com.skhu.dto;

import com.skhu.domain.UserLevel;
import com.skhu.service.EncryptionService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

public class UserDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class SignUpRequest{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Size(min = 8)
        private String password;

        @NotBlank
        private String nickname;

        @Builder
        public SignUpRequest(String email, String password, String nickname){
            this.email = email;
            this.password = password;
            this.nickname = nickname;
        }

        public void passwordEncryption(EncryptionService encryptionService){
            this.password = encryptionService.encrypt(password);
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginRequest{
        private String email;
        private String password;

        public void passwordEncryption(EncryptionService encryptionService){
            this.password = encryptionService.encrypt(password);
        }
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginResponse {
        private String token;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UserResponse {

        private Long id;

        private String email;

        private String nickname;

        private String userLevel;

        private String[] socialTypes;

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UserSearchRequest {

        private Long id;

        private String email;

        private String nickname;

        private UserLevel userLevel;

        @Builder
        public UserSearchRequest(Long id, String email, String nickname, UserLevel userLevel) {
            this.id = id;
            this.email = email;
            this.nickname = nickname;
            this.userLevel = userLevel;
        }

    }

}
