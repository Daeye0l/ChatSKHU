package com.skhu.repository;

import com.skhu.domain.ChatRoom;
import com.skhu.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("SELECT cr FROM ChatRoom cr WHERE cr.user = :user AND cr.modifiedDate >= :startDate AND cr.modifiedDate < :endDate")
    List<ChatRoom> findChatRoomByUserAndModifiedDate(User user, LocalDateTime startDate, LocalDateTime endDate);


}
