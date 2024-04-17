package com.skhu.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
@AllArgsConstructor
public enum ErrorCode {
    // DUPLICATE
    DUPLICATE_USER_EMAIL(HttpStatus.BAD_REQUEST, "D001", "이미 사용 중인 이메일입니다."),
    DUPLICATE_USER_NICKNAME(HttpStatus.BAD_REQUEST, "D002", "이미 사용 중인 닉네임입니다."),
    // NOT_FOUND
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "N001", "존재하지 않는 사용자입니다."),

    // INVALID
    INVALID_EMAIL_PASSWORD_MATCH(HttpStatus.UNAUTHORIZED, "I001", "이메일과 비밀번호가 일치하지 않습니다."),


    // UNAUTHORIZED
    UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "U001", "로그인이 필요합니다."),

    // FORBIDDEN
    FORBIDDEN_USER_LEVEL(HttpStatus.FORBIDDEN, "F001", "접근 권한이 없습니다.");

    private final HttpStatus httpStatus;

    private final String code;
    private final String message;
}