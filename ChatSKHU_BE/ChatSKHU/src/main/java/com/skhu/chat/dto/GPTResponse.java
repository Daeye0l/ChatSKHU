package com.skhu.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//gpt 응답을 위한 DTO 클래스
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GPTResponse {
	private List<Choice> choices; // 답변이 들어있는 choices를 리스트를 받아 값을 채움
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Choice {
		// choices 리스트의 인덱스와 메시지 값을 채움
		private int index;
		private Message message;
	}
}