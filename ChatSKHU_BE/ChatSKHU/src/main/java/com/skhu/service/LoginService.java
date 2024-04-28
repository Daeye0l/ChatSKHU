package com.skhu.service;

import com.skhu.domain.User;
import com.skhu.domain.UserLevel;
import com.skhu.dto.OAuthDto;
import com.skhu.dto.UserDto;
import com.skhu.error.CustomException;
import com.skhu.jwt.TokenProvider;
import com.skhu.oauth2.SocialConnection;
import com.skhu.oauth2.SocialConnectionRepository;
import com.skhu.oauth2.SocialType;
import com.skhu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.skhu.error.ErrorCode.DUPLICATE_USER_NICKNAME;
import static com.skhu.error.ErrorCode.INVALID_EMAIL_PASSWORD_MATCH;


@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    private final SocialConnectionRepository socialConnectionRepository;

    private final EncryptionService encryptionService;

    private final TokenProvider tokenProvider;

    protected User findUserByValidatingCredentials(UserDto.LoginRequest request) {
        String email = request.getEmail();
        String rawPassword = request.getPassword();

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null || !encryptionService.match(rawPassword, user.getPassword())) {
            throw new CustomException(INVALID_EMAIL_PASSWORD_MATCH);
        }

        return user;
    }

    private UserDto.LoginResponse createTokenForUser(User user) {
        String email = user.getEmail();
        UserLevel level = user.getUserLevel();

        String token = tokenProvider.createToken(email, level);

        return UserDto.LoginResponse.builder()
                .token(token)
                .build();
    }

    @Transactional
    public UserDto.LoginResponse login(UserDto.LoginRequest request) {
        User user = findUserByValidatingCredentials(request);

        return createTokenForUser(user);
    }

    private boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserDto.LoginResponse socialLogin(OAuthDto.LoginRequest request) {
        SocialType socialType = SocialType.valueOf(request.getSocialType());
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<SocialConnection> socialConnectionOptional = socialConnectionRepository.findByUserAndSocialType(user, socialType);

            if (socialConnectionOptional.isEmpty()) {
                // 소셜 로그인 정보가 없다면, 소셜 로그인 정보를 추가
                SocialConnection newSocialConnection = SocialConnection.builder()
                        .socialType(socialType)
                        .socialUid(request.getSocialUid())
                        .user(user)
                        .build();
                user.addSocialConnection(newSocialConnection);
                user.certify();
                userRepository.save(user);
            }

            return createTokenForUser(user);
        }

        // 사용자가 존재하지 않으면 회원가입 후 토큰 발급
        if (checkNicknameDuplicate(request.getNickname())) {
            throw new CustomException(DUPLICATE_USER_NICKNAME);
        }

        User user = User.builder()
                .email(request.getEmail())
                .nickname(request.getNickname())
                .build();

        // oauth 로그인 시에는 이메일 인증을 생략
        user.certify();

        SocialConnection socialConnection = socialConnectionRepository.save(SocialConnection.builder()
                .socialType(socialType)
                .socialUid(request.getSocialUid())
                .user(user)
                .build());

        user.addSocialConnection(socialConnection);

        userRepository.save(user);

        return createTokenForUser(user);
    }

}
