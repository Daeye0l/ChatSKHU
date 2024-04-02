package com.skhu.domain;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends UserBase{
    private String nickname;

    @Builder
    public User(String email, String password, String nickname){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}
