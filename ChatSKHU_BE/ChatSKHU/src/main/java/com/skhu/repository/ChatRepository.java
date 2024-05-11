package com.skhu.repository;

import com.skhu.domain.Chat;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatRepository extends JpaRepository<Chat, Long>{
}
