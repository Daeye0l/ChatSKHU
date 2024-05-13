package com.skhu.oauth.service;

import com.skhu.oauth.domain.User;
import com.skhu.oauth.domain.UserLevel;
import com.skhu.oauth.dto.UserDto;
import com.skhu.error.CustomException;
import com.skhu.oauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.skhu.error.ErrorCode.*;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    private boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserDto.UserResponse signup(UserDto.SignUpRequest request, String email) {

        if (checkNicknameDuplicate(request.getNickname())) {
            throw new CustomException(DUPLICATE_USER_NICKNAME);
        }
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

    @Transactional
    public UserDto.UserResponse updateUserInfo(UserDto.UpdateRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        if (request.getNickname() != null)
            user.setNickname(request.getNickname());
        if (request.getStudentNo() != 0)
            user.setStudentNo(request.getStudentNo());
        return UserDto.UserResponse.of(user);
    }


}
