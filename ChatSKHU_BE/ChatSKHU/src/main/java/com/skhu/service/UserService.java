package com.skhu.service;

import com.skhu.domain.User;
import com.skhu.dto.UserDto;
import com.skhu.error.CustomException;
import com.skhu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.skhu.error.ErrorCode.*;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final EncryptionService encryptionService;


    private boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    private boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public void save(UserDto.SignUpRequest request) {
        if (checkEmailDuplicate(request.getEmail())) {
            throw new CustomException(DUPLICATE_USER_EMAIL);
        }
        if (checkNicknameDuplicate(request.getNickname())) {
            throw new CustomException(DUPLICATE_USER_NICKNAME);
        }

        request.passwordEncryption(encryptionService);

        userRepository.save(User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .nickname(request.getNickname())
                .build());
    }

    @Transactional(readOnly = true)
    public UserDto.UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        return UserDto.UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .userLevel(user.getUserLevel().toString())
                .socialTypes(user.getSocialTypes())
                .build();
    }


}
