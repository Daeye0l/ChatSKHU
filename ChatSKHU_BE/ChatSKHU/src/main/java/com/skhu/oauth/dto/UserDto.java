package com.skhu.oauth.dto;

import com.skhu.oauth.domain.User;
import com.skhu.oauth.domain.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class UserDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class SignUpRequest{
        @NotBlank
        private String nickname;

        @Builder
        public SignUpRequest(String nickname){
            this.nickname = nickname;
        }
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UpdateRequest{
        private String nickname;

        @Builder
        public UpdateRequest(String nickname){
            this.nickname = nickname;
        }
    }

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

        private Long id;

        private String email;

        private String nickname;

        private UserRole userRole;

        private String socialType;

        private String imageUrl;
        


        public static UserResponse of(User user){
            return UserResponse.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .userRole(user.getUserRole())
                    .nickname(user.getNickname())
                    .socialType(user.getSocialType())
                    .imageUrl(user.getImageUrl())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UserSearchRequest {

        private Long id;

        private String email;

        private String nickname;

        private UserRole userRole;

        @Builder
        public UserSearchRequest(Long id, String email, String nickname, UserRole userRole) {
            this.id = id;
            this.email = email;
            this.nickname = nickname;
            this.userRole = userRole;
        }

    }

}
