package com.skhu.controller;

import com.skhu.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GPTController {
	@Value("${openai.model}")
	private String model;
	
	private final ChatService chatService;
	
	@PostMapping("/chat")
	public String chat(@RequestBody String prompt) {
		return chatService.chat(prompt);
	}
	
	@PostMapping("/save")
	public void save(@RequestBody String prompt) {
		chatService.save(prompt);
	}
}
