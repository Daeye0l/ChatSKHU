package com.skhu.oauth.service;

import com.skhu.error.CustomException;
import com.skhu.oauth.domain.User;
import com.skhu.oauth.domain.UserRole;
import com.skhu.oauth.dto.UserDto;
import com.skhu.oauth.jwt.TokenProvider;
import com.skhu.oauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.skhu.error.ErrorCode.DUPLICATE_USER_NICKNAME;
import static com.skhu.error.ErrorCode.NOT_FOUND_USER;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;


    private boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserDto.LoginResponse signup(UserDto.SignUpRequest request, String email) {

        if (checkNicknameDuplicate(request.getNickname())) {
            throw new CustomException(DUPLICATE_USER_NICKNAME);
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        user.setNickname(request.getNickname());
        user.setStudentNo(request.getStudentNo());
        user.setUserRole(UserRole.ROLE_USER);
        userRepository.save(user);
        return tokenProvider.createToken(email, user.getUserRole());
    }

    @Transactional(readOnly = true)
    public UserDto.UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));
        return UserDto.UserResponse.of(user);
    }

    @Transactional
    public UserDto.UserResponse updateUserInfo(UserDto.UpdateRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        if (!checkNicknameDuplicate(request.getNickname()) && request.getNickname() != null)
            user.setNickname(request.getNickname());
        if (request.getStudentNo() != 0)
            user.setStudentNo(request.getStudentNo());
        return UserDto.UserResponse.of(user);
    }

    @Transactional
    public UserRole changeUserRoleToAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        user.setUserRole(UserRole.ROLE_ADMIN);
        userRepository.save(user);
        return user.getUserRole();
    }
}
