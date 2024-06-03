package com.skhu.oauth.controller;

import com.skhu.oauth.domain.UserRole;
import com.skhu.oauth.service.UserService;
import com.skhu.report.dto.ReportDto;
import com.skhu.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final ReportService reportService;
    private final UserService userService;

    @Operation(summary = "Report 삭제", description = "개선사항 db에서 삭제")
    @DeleteMapping("/report/{reportId}")
    public ResponseEntity<ReportDto.ReportResponse> reportDelete(@PathVariable("reportId") Long reportId) {
        return ResponseEntity.ok(reportService.reportDelete(reportId));
    }

    @Operation(summary = "Report Answer 저장", description = "답변 내용 db에 저장")
    @PutMapping("/answer/{reportId}")
    public ResponseEntity<ReportDto.ReportResponse> addAnswer(@PathVariable("reportId") Long reportId, @RequestBody ReportDto.ReportAddAnswer reportAddAnswer, Principal principal) {
        return ResponseEntity.ok(reportService.updateAnswer(reportId, reportAddAnswer, principal.getName()));
    }

    @Operation(summary = "ADMIN 권한 부여", description = "관리자 권한 부여")
    @PutMapping("/role/{userId}")
    public UserRole changeUserRoleToAdmin(@PathVariable("userId") Long userId) {
        return userService.changeUserRoleToAdmin(userId);
    }
}
