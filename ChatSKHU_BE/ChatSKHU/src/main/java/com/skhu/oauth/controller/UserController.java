package com.skhu.oauth.controller;

import com.skhu.common.UserLevelCheck;
import com.skhu.oauth.dto.UserDto;
import com.skhu.oauth.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "UserController", description = "유저 정보 관련 API")
public class UserController {

    private final UserService userService;
    @Operation(
            summary = "회원가입",
            description = "소셜 로그인 후 사용자 정보 받는 API"
    )
    @PostMapping("/signup")
    public ResponseEntity<UserDto.UserResponse> signUp(@Valid @RequestBody UserDto.SignUpRequest request, Principal principal){
        return ResponseEntity.ok(userService.signup(request, principal.getName()));
    }

    @PostMapping("/update")
    @Operation(
            summary = "회원 정보 수정",
            description = "회원 정보 수정하는 API"
    )
    public ResponseEntity<UserDto.UserResponse> updateUserInfo(@RequestBody UserDto.UpdateRequest request, Principal principal){
        return ResponseEntity.ok(userService.updateUserInfo(request, principal.getName()));
    }


    @GetMapping
    @UserLevelCheck
    @Operation(
            summary = "마이페이지",
            description = "회원 정보 조회하는 API"
    )
    public ResponseEntity<UserDto.UserResponse> myPage(Principal principal) {
        return ResponseEntity.ok(userService.findByEmail(principal.getName()));
    }
}
