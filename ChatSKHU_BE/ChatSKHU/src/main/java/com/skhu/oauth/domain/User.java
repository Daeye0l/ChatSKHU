package com.skhu.oauth.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.skhu.chat.domain.ChatRoom;
import com.skhu.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @Column(unique = true)
    protected String email;

    @Enumerated(EnumType.STRING)
    protected UserRole userRole;

    private String nickname;

    private String imageUrl;

    private int studentNo;

    private String socialType;

    private String socialId;

    @JsonIgnore
    @ToStringExclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "user")
    private List<ChatRoom> chatRooms;

    @Builder
    public User(String email, String nickname, String imageUrl, int studentNo, String socialId, String socialType) {
        this.email = email;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.studentNo = studentNo;
        this.socialId = socialId;
        this.socialType = socialType;
        this.userRole = UserRole.ROLE_UNAUTH;
    }

    public void certify() {
        if (this.userRole == UserRole.ROLE_UNAUTH) {
            this.userRole = UserRole.ROLE_USER;
        }


    }
}
