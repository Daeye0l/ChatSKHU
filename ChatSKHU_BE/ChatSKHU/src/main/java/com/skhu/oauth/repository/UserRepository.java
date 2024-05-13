package com.skhu.oauth.repository;


import com.skhu.oauth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    boolean existsByNickname(String nickname);
    Optional<User> findByEmail(String email);

}
