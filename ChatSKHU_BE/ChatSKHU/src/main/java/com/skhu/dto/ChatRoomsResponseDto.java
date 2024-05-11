package com.skhu.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomsResponseDto {
    List<ChatRoomResponseDto> today;
    List<ChatRoomResponseDto> yesterday;
    List<ChatRoomResponseDto> week;
    List<ChatRoomResponseDto> month;


}
