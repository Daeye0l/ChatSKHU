package com.skhu.controller;

import com.skhu.dto.FlaskRequest;
import com.skhu.dto.FlaskResponse;
import com.skhu.dto.GPTRequest;
import com.skhu.dto.GPTResponse;
import com.skhu.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

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
	public String chat(@RequestParam("question") String question) {
		return chatService.chat(question);
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
