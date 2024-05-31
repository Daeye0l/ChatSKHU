package com.skhu.report.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ReportDto {
	@Data
    @AllArgsConstructor
    @NoArgsConstructor
	public static class ReportSearchResponse {
		private Long id;
		private String title;
	    private String content;
	    private String answer;
	    private LocalDateTime createdDate;
	    private LocalDateTime modifiedDate;
	    private String nickName;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ReportSaveRequest {
		private String title;
		private String content;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ReportResponse {
		private Long id;
		private String title;
		private String content;
		private String answer;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ReportAddAnswer {
		private String answer;
	}
}