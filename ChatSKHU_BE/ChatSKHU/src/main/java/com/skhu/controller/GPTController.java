package com.skhu.controller;

import com.skhu.dto.FlaskResponse;
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

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GPTController {
	@Value("${openai.model}")
	private String model;
	
	private final ChatService chatService;
	
	@PostMapping("/chat")
	public GPTResponse chat(@RequestBody FlaskResponse flaskResponse) {
		return chatService.chat(flaskResponse);
	}
	
	@PostMapping("/save")
	public void save(@RequestBody String prompt) {
		chatService.save(prompt);
	}
	
	@GetMapping("/prompt")
	public FlaskResponse question(@RequestParam("question") String question) {
		return chatService.getPrompt(question);
	}
}
