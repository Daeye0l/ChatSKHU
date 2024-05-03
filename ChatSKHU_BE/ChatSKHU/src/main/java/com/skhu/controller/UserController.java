package com.skhu.controller;

import com.skhu.common.CurrentUser;
import com.skhu.common.UserLevelCheck;
import com.skhu.dto.UserDto;
import com.skhu.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
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
public class UserController {

    private final UserService userService;
    @Operation(
            summary = "회원가입",
            description = "소셜 로그인 후 사용자 정보 받는 API"
    )
    @PostMapping("/signup")
    public ResponseEntity<UserDto.UserResponse> signUp(@Valid @RequestBody UserDto.SignUpRequest request, Principal principal){
        return ResponseEntity.ok(userService.signup(request, principal));
    }

    @PostMapping("/nickname")
    public ResponseEntity<UserDto.UserResponse> updateUserInfo(@RequestBody String nickname, Principal principal){
        return ResponseEntity.ok(userService.updateNickname(nickname, principal));
    }


    @GetMapping
    @UserLevelCheck
    public ResponseEntity<UserDto.UserResponse> myPage(@CurrentUser String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }
}
