package com.skhu.controller;

import com.skhu.dto.GPTRequest;
import com.skhu.dto.GPTResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GPTController {
	@Value("${openai.model}")
	private String model;
	
	private final RestTemplate restTemplate;
	
	@GetMapping("/chat")
	public String chat(@RequestParam("prompt") String prompt) {
		GPTRequest request = new GPTRequest(model, prompt, 1, 256);
		GPTResponse response = restTemplate.postForObject("https://api.openai.com/v1/chat/completions", request, GPTResponse.class);
		return response.getChoices().get(0).getMessage().getContent();
	}
	
}