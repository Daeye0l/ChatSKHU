package com.skhu.report.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skhu.report.dto.ReportDto;
import com.skhu.report.service.ReportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@Tag(name = "ReportController", description = "개선사항 게시판 관련 API")
public class ReportController {
	private final ReportService reportService;
	
	@Operation(summary = "Report 저장", description = "개선사항 제목과 내용 db에 저장")
	@PostMapping
	public void reportSave(@RequestBody ReportDto.ReportSaveRequest reportSaveRequest, Principal principal) {
		reportService.reportSave(reportSaveRequest, principal.getName());
	}
	
	@Operation(summary = "Report 삭제", description = "개선사항 db에서 삭제")
	@DeleteMapping("/{reportId}")
	public void reportDelete(@PathVariable("reportId") Long reportId) {
		reportService.reportDelete(reportId);
	}
	
	@Operation(summary = "Report Answer 저장", description = "답변 내용 db에 저장")
	@PutMapping("/answer/{reportId}")
	public void addAnswer(@PathVariable("reportId") Long reportId, @RequestBody ReportDto.ReportAddAnswer reportAddAnswer, Principal principal) {
		reportService.updateAnswer(reportId, reportAddAnswer, principal.getName());
	}
	
	@Operation(summary = "ReportList 확인", description = "UserId에 따른 CreatedDate 최신순 Report 목록 조회")
	@GetMapping("/list")
	public ResponseEntity<List<ReportDto.ReportSearchResponse>> reportList(Principal principal) {
		return ResponseEntity.ok(reportService.findByUserIdOrderByCreatedDateDesc(principal.getName()));
	}
}