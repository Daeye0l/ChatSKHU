package com.skhu.service;

import com.skhu.domain.User;
import com.skhu.dto.UserDto;
import com.skhu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    private Specification<User> checkSearchCondition(UserDto.UserSearchRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.getId() != null) {
                predicates.add(cb.equal(root.get("id"), request.getId()));
            }
            if (request.getEmail() != null) {
                predicates.add(cb.like(root.get("email"), "%" + request.getEmail() + "%"));
            }
            if (request.getNickname() != null) {
                predicates.add(cb.like(root.get("nickname"), "%" + request.getNickname() + "%"));
            }
            if (request.getUserLevel() != null) {
                predicates.add(cb.equal(root.get("userLevel"), request.getUserLevel()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    @Transactional(readOnly = true)
    public Page<UserDto.UserResponse> getUsers(UserDto.UserSearchRequest request, Pageable pageable) {
        return userRepository.findAll(checkSearchCondition(request), pageable)
                .map(user -> UserDto.UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .nickname(user.getNickname())
                        .userLevel(user.getUserLevel().toString())
                        .socialTypes(user.getSocialTypes())
                        .build());
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
