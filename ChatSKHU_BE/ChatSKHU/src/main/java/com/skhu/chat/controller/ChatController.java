package com.skhu.chat.controller;

import com.skhu.chat.dto.ChatDto;
import com.skhu.chat.service.ChatService;
import lombok.RequiredArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ChatDto.ChatResponse> chat(@PathVariable("chatRoomId") Long chatRoomId, @RequestBody ChatDto.ChatRequest chatRequest, Principal principal) {
        return ResponseEntity.ok(chatService.chat(chatRoomId, chatRequest, principal.getName()));
    }

    @Operation(summary = "ChatList 확인", description = "UserId에 따른 CreatedDate 최신순 Chat 목록 조회")
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<List<ChatDto.ChatSearchResponse>> chatList(@PathVariable("chatRoomId") Long chatRoomId, Principal principal) {
        return ResponseEntity.ok(chatService.getChatList(chatRoomId, principal.getName()));
    }

    @Operation(
            summary = "ChatRoom 생성",
            description = "ChatRoom 생성하는 API")
    @PostMapping("/chatroom")
    public ResponseEntity<ChatDto.ChatRoomResponse> chatRoom(Principal principal) {
        return ResponseEntity.ok(chatService.createChatRoom(principal.getName()));
    }

    @Operation(
            summary = "날짜별 ChatRoom 조회",
            description = "오늘, 어제, 근 일주일, 근 한달 그룹으로 ChatRoom 조회하는 API")
    @GetMapping("/chatroom")
    public ResponseEntity<ChatDto.ChatRoomsResponse> getChatRooms(Principal principal) {
        return ResponseEntity.ok(chatService.getChatRooms(principal.getName()));
    }

    @Operation(
            summary = "ChatRoom Title 수정",
            description = "ChatRoom Title 수정하는 API")
    @PutMapping("chatroom/{chatRoomId}")
    public ResponseEntity<ChatDto.ChatRoomResponse> updateChatRoomTitle(@PathVariable("chatRoomId") Long
                                                                                chatRoomId, @RequestBody ChatDto.ChatRoomUpdateRequest request) {
        return ResponseEntity.ok(chatService.updateChatRoomTitle(request, chatRoomId));
    }

    @Operation(
            summary = "ChatRoom 삭제",
            description = "ChatRoom 삭제하는 API")
    @DeleteMapping("chatroom/{chatRoomId}")
    public void deleteChatRoom(@PathVariable("chatRoomId") Long chatRoomId) {
        chatService.deleteChatRoom(chatRoomId);
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
