package com.skhu.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
	public static class ReportPageResponse {
		private List<ReportSearchResponse> reports;
		private int totalPage;
		private int currentPage;
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
	@Builder
	public static class ReportAnswerResponse {
		private String answer;
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