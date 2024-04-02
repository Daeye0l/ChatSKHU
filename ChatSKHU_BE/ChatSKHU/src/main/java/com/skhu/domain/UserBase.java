package com.skhu.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class UserBase extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "USER_ID")
    protected Long id;

    @Column(unique = true)
    protected String email;

    protected String password;

    @Enumerated(EnumType.STRING)
    protected UserLevel userLevel;
}

