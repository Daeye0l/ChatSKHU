package com.skhu.dto;

import com.skhu.domain.User;
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
        private String nickname;
        private int studentNo;

        @Builder
        public SignUpRequest(String nickname, int studentNo){
            this.nickname = nickname;
            this.studentNo = studentNo;
        }
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UpdateRequest{
        private String nickname;
        private int studentNo;

        @Builder
        public UpdateRequest(String nickname, int studentNo){
            this.nickname = nickname;
            this.studentNo = studentNo;
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

        private UserLevel userLevel;

        private String socialType;
        
        private int studentNo;

        public UserResponse(String email, UserLevel userLevel, String nickname, String socialType) {
        }

        public UserResponse(String email, UserLevel userLevel, String nickname, String socialType, int studentNo) {
        }

        public static UserResponse of(User user){
            return UserResponse.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .userLevel(user.getUserLevel())
                    .nickname(user.getNickname())
                    .socialType(user.getSocialType())
                    .studentNo(user.getStudentNo())
                    .build();
        }
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
