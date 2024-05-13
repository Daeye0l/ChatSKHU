package com.skhu.chat.repository;

import com.skhu.chat.domain.Chat;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatRepository extends JpaRepository<Chat, Long>{
}
