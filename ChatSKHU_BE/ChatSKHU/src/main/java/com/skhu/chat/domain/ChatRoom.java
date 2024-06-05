package com.skhu.chat.domain;

import com.skhu.common.BaseTimeEntity;
import com.skhu.oauth.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class ChatRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "CHATROOM_ID")
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany
    private List<Chat> chat;

    @Builder
    public ChatRoom(String title, User user){
        this.title = title;
        this.user = user;
    }

}
