package com.skhu.service;

import com.skhu.domain.User;
import com.skhu.domain.UserLevel;
import com.skhu.dto.UserDto;
import com.skhu.error.CustomException;
import com.skhu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Optional;

import static com.skhu.error.ErrorCode.*;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    private boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserDto.UserResponse signup(UserDto.SignUpRequest request, Principal principal) {

        if (checkNicknameDuplicate(request.getNickname())) {
            throw new CustomException(DUPLICATE_USER_NICKNAME);
        }
        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        user.setNickname(request.getNickname());
        user.setStudentNo(request.getStudentNo());
        user.setUserLevel(UserLevel.USER);
        userRepository.save(user);
        return UserDto.UserResponse.of(user);
    }

    @Transactional(readOnly = true)
    public UserDto.UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));
        return UserDto.UserResponse.of(user);
    }



}
