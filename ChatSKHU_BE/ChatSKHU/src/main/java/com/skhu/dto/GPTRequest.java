package com.skhu.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

// gpt 요청을 위한 DTO 클래스
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class) // gpt에서 요구하는 json 키값이 snake케이스이므로 camel케이스인 dto객체의 필드와 매핑하기 위함.
public class GPTRequest {
	private String model; // 모델 이름
	private List<Message> messages; // 리스트 형태의 메시지
	private int maxTokens;
	
	public GPTRequest(String model, String prompt, int maxTokens) {
		this.model = model;
		this.messages = new ArrayList<>();
		this.messages.add(new Message("user", prompt));
		this.maxTokens = maxTokens;
	}
}