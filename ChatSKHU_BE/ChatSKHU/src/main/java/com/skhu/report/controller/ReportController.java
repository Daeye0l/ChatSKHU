package com.skhu.report.controller;

import com.skhu.report.dto.ReportDto;
import com.skhu.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@Tag(name = "ReportController", description = "개선사항 게시판 관련 API")
public class ReportController {
	private final ReportService reportService;

	@Operation(summary = "Report 저장", description = "개선사항 저장")
	@PostMapping
	public ResponseEntity<ReportDto.ReportResponse> reportSave(@RequestBody ReportDto.ReportSaveRequest reportSaveRequest, Principal principal) {
		return ResponseEntity.ok(reportService.reportSave(reportSaveRequest, principal.getName()));
	}

	@Operation(summary = "Report 삭제", description = "개선사항 삭제")
	@DeleteMapping("/{reportId}")
	public ResponseEntity<ReportDto.ReportResponse> reportDelete(@PathVariable("reportId") Long reportId) {
		return ResponseEntity.ok(reportService.reportDelete(reportId));
	}

	@Operation(summary = "Report 수정", description = "개선사항 수정")
	@PutMapping("/{reportId}")
	public ResponseEntity<ReportDto.ReportResponse> reportModify(@PathVariable("reportId") Long reportId, @RequestBody ReportDto.ReportSaveRequest reportSaveRequest) {
		return ResponseEntity.ok(reportService.reportModify(reportId, reportSaveRequest));
	}


	@Operation(summary = "ReportList 확인", description = "UserId에 따른 CreatedDate 최신순 Report 목록 조회")
	@GetMapping("/list")
	public ResponseEntity<List<ReportDto.ReportSearchResponse>> reportList(Principal principal) {
		return ResponseEntity.ok(reportService.findByUserIdOrderByCreatedDateDesc(principal.getName()));
	}
}