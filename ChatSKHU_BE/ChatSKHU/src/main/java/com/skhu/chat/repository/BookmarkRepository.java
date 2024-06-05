package com.skhu.chat.repository;


import com.skhu.chat.domain.Bookmark;
import com.skhu.chat.domain.Chat;
import com.skhu.oauth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUserAndChat(User user, Chat chat);

    List<Bookmark> findByUser(User user);


    void deleteByUserAndChat(User user, Chat chat);
}
