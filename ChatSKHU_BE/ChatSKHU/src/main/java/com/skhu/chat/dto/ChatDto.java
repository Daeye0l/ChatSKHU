package com.skhu.chat.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class ChatDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatRequest {
        private String question;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatResponse {
        private String answer;
        private Long chatRoomId;
    }
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatSearchResponse {
        private Long id;
        private String question;
        private String answer;
        private LocalDateTime createdDate;
        private Long chatRoomId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatRoomRequest {
        private String title;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatRoomResponse {
        private Long id;
        private String title;
        private Long userId;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatRoomsResponse {
        List<ChatRoomResponse> today;
        List<ChatRoomResponse> yesterday;
        List<ChatRoomResponse> week;
        List<ChatRoomResponse> month;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatRoomUpdateRequest {
        private String title;
    }


}
