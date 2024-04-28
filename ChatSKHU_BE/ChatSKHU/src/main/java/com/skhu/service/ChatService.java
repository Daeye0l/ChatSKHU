package com.skhu.service;

import com.skhu.dto.GPTRequest;
import com.skhu.dto.GPTResponse;
import com.skhu.domain.Chat;
import com.skhu.repository.ChatRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ChatService {
	private final ChatRepository chatRepository;
	private final RestTemplate restTemplate;

	@Value("${openai.model}")
	private String model;
	
	@Transactional
	public String chat(String prompt) {
		GPTRequest request = new GPTRequest(model, prompt, 1, 256);
		GPTResponse response = restTemplate.postForObject("https://api.openai.com/v1/chat/completions", request,
				GPTResponse.class);
		String answer = response.getChoices().get(0).getMessage().getContent();
		return answer;
	}
	
	@Transactional
	public void save(String prompt) {
		String answer = chat(prompt);

		chatRepository.save(Chat.builder()
				.question(prompt)
				.answer(answer)
				.build());
	}
}
