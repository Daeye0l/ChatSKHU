package com.skhu.controller;

import com.skhu.common.CurrentUser;
import com.skhu.common.UserLevelCheck;
import com.skhu.dto.OAuthDto;
import com.skhu.dto.UserDto;
import com.skhu.service.LoginService;
import com.skhu.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final LoginService loginService;
    @Operation(
            summary = "회원가입",
            description = "소셜 로그인 후 사용자 정보 받는 API"
    )
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@Valid @RequestBody UserDto.SignUpRequest request){
        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PostMapping("/login")
    public UserDto.LoginResponse login(@Valid @RequestBody UserDto.LoginRequest request){
        return loginService.login(request);
    }
    @PostMapping("/login/oauth")
    public ResponseEntity<UserDto.LoginResponse> loginOAuth(@Valid @RequestBody OAuthDto.LoginRequest request) {
        return ResponseEntity.ok(loginService.socialLogin(request));
    }

    @GetMapping
    @UserLevelCheck
    public ResponseEntity<UserDto.UserResponse> myPage(@CurrentUser String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }
}
