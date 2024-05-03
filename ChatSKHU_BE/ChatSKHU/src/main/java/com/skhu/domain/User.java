package com.skhu.domain;

import jakarta.persistence.*;
import lombok.*;
import static com.skhu.domain.UserLevel.UNAUTH;
import static com.skhu.domain.UserLevel.USER;
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
    protected UserLevel userLevel;

    private String nickname;

    private String imageUrl;

    private int studentNo;

    private String socialType;

    private String socialId;

    @Builder
    public User(String email, String nickname, String imageUrl, int studentNo, String socialId, String socialType) {
        this.email = email;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.studentNo = studentNo;
        this.socialId = socialId;
        this.socialType = socialType;
        this.userLevel = UNAUTH;
    }

    public void certify() {
        if (this.userLevel == UNAUTH) {
            this.userLevel = USER;
        }


    }
}
