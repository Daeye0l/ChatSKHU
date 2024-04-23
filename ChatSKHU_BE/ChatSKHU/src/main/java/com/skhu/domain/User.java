package com.skhu.domain;

import com.skhu.oauth2.SocialConnection;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import static com.skhu.domain.UserLevel.UNAUTH;
import static jakarta.persistence.CascadeType.ALL;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends UserBase{
    private String nickname;

    @OneToMany(mappedBy = "user", cascade = ALL, orphanRemoval = true)
    private Set<SocialConnection> socialConnections = new HashSet<>();

    @Builder
    public User(String email, String password, String nickname){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.userLevel = UNAUTH;

    }

    public void addSocialConnection(SocialConnection socialConnection) {
        this.socialConnections.add(socialConnection);
    }

    public String[] getSocialTypes() {
        return socialConnections.stream()
                .map(SocialConnection::getSocialType)
                .map(Enum::name)
                .toArray(String[]::new);
    }

}
