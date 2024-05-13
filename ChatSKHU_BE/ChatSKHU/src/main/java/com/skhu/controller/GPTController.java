package com.skhu.controller;

import com.skhu.dto.*;
import com.skhu.service.ChatService;
import lombok.RequiredArgsConstructor;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.security.Principal;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
@Tag(name = "GPTController", description = "GPT 답변 생성 관련 API")
public class GPTController {
	@Value("${openai.model}")
	private String model;
	
	private final ChatService chatService;
	
	@Operation(summary = "OpenAI API 호출", description = "GPT 답변 확인")
	@GetMapping("/chat")
	public String chat(@RequestParam("question") String question, Principal principal) {
		return chatService.chat(question, principal.getName());
	}

	@Operation(
			summary = "ChatRoom 생성",
			description = "ChatRoom 생성하는 API")
	@PostMapping("/chatroom")
	public ChatRoomResponseDto chatRoom(@RequestBody String title, Principal principal){
		return chatService.createChatRoom(title, principal.getName());
	}

	@Operation(
			summary = "날짜별 ChatRoom 조회",
			description = "오늘, 어제, 근 일주일, 근 한달 그룹으로 ChatRoom 조회하는 API")
	@GetMapping("/chatroom")
	public ChatRoomsResponseDto getChatRooms(Principal principal){
		return chatService.getChatRooms(principal.getName());
	}

	@Operation(
			summary = "ChatRoom Title 수정",
			description = "ChatRoom Title 수정하는 API")
	@PostMapping("title")
	public ChatRoomResponseDto updateChatRoomTitle(String title, Long chatRoomId){
		return chatService.updateChatRoomTitle(title, chatRoomId);
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
