package com.skhu.report.dto;

import lombok.*;
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
	public static class ReportAddAnswer {
		private String answer;
	}
}