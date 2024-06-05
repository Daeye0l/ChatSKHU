package com.skhu.chat.repository;

import com.skhu.chat.domain.Bookmark;
import com.skhu.chat.domain.Chat;
import com.skhu.oauth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ChatRepository extends JpaRepository<Chat, Long>{
	List<Chat> findByChatRoomIdOrderByCreatedDateDesc(Long userId);

}
