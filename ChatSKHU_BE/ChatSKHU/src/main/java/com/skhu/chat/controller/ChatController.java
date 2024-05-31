package com.skhu.chat.controller;

import com.skhu.chat.dto.ChatDto;
import com.skhu.chat.service.ChatService;
import com.skhu.common.ApiResponse;
import lombok.RequiredArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Tag(name = "Chat Controller", description = "Chat 관련 API")
public class ChatController {
    private final ChatService chatService;

    @Operation(summary = "OpenAI API 호출", description = "GPT 답변 확인")
    @PostMapping("/{chatRoomId}")
    public ApiResponse<ChatDto.ChatResponse> chat(@PathVariable("chatRoomId") Long chatRoomId, @RequestBody ChatDto.ChatRequest chatRequest, Principal principal) {
        return ApiResponse.ok(chatService.chat(chatRoomId, chatRequest, principal.getName()));
    }

    @Operation(summary = "ChatList 확인", description = "UserId에 따른 CreatedDate 최신순 Chat 목록 조회")
    @GetMapping("/{chatRoomId}")
    public ApiResponse<List<ChatDto.ChatSearchResponse>> chatList(@PathVariable("chatRoomId") Long chatRoomId) {
        return ApiResponse.ok(chatService.getChatList(chatRoomId));
    }

    @Operation(
            summary = "ChatRoom 생성",
            description = "ChatRoom 생성하는 API")
    @PostMapping("/chatroom")
    public ApiResponse<ChatDto.ChatRoomResponse> chatRoom(Principal principal) {
        return ApiResponse.created(chatService.createChatRoom(principal.getName()));
    }

    @Operation(
            summary = "날짜별 ChatRoom 조회",
            description = "오늘, 어제, 근 일주일, 근 한달 그룹으로 ChatRoom 조회하는 API")
    @GetMapping("/chatroom")
    public ApiResponse<ChatDto.ChatRoomsResponse> getChatRooms(Principal principal) {
        return ApiResponse.ok(chatService.getChatRooms(principal.getName()));
    }

    @Operation(
            summary = "ChatRoom Title 수정",
            description = "ChatRoom Title 수정하는 API")
    @PutMapping("chatroom/{chatRoomId}")
    public ApiResponse<ChatDto.ChatRoomResponse> updateChatRoomTitle(@PathVariable("chatRoomId") Long
                                                                                chatRoomId, @RequestBody ChatDto.ChatRoomUpdateRequest request) {
        return ApiResponse.ok(chatService.updateChatRoomTitle(request, chatRoomId));
    }
	/*
	@Operation(summary = "DB 저장", description = "질문과 답변 DB에 저장")
	@PostMapping("/save")
	public void save(@RequestBody String prompt) {
		chatService.save(prompt);
	}
	
	@Operation(summary = "Flask서버 API 호출", description = "질문으로부터 최종 프롬프트 구성")
	@GetMapping("/prompt")
	public FlaskResponse question(@RequestBody FlaskRequest flaskRequest) {
		return chatService.getPrompt(flaskRequest);
	}*/
}
