package com.skhu.report.dto;

import lombok.*;
import java.time.LocalDateTime;

import com.skhu.chat.dto.ChatDto;
import com.skhu.oauth.domain.User;

public class ReportDto {
	@Data
    @AllArgsConstructor
    @NoArgsConstructor
	public static class ReportSearchResponse {
		private String title;
	    private String content;
	    private String answer;
	    private LocalDateTime createdDate;	
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ReportSaveRequest {
		private String title;
		private String content;
	}
}