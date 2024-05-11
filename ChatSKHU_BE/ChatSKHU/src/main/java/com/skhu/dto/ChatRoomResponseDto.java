package com.skhu.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomResponseDto {
    private Long id;
    private String title;
    private Long userId;



}
