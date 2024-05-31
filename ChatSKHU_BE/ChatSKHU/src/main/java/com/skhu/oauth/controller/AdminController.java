package com.skhu.oauth.controller;

import com.skhu.common.ApiResponse;
import com.skhu.oauth.service.UserService;
import com.skhu.report.dto.ReportDto;
import com.skhu.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
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
    public ApiResponse<ReportDto.ReportResponse> reportDelete(@PathVariable("reportId") Long reportId) {
        return ApiResponse.ok(reportService.reportDelete(reportId));
    }

    @Operation(summary = "Report Answer 저장", description = "답변 내용 db에 저장")
    @PutMapping("/answer/{reportId}")
    public ApiResponse<ReportDto.ReportResponse> addAnswer(@PathVariable("reportId") Long reportId, @RequestBody ReportDto.ReportAddAnswer reportAddAnswer, Principal principal) {
        return ApiResponse.ok(reportService.updateAnswer(reportId, reportAddAnswer, principal.getName()));
    }

    @Operation(summary = "ADMIN 권한 부여", description = "관리자 권한 부여")
    @PutMapping("/role{userId}")
    public void changeUserRoleToAdmin(@PathVariable ("userId") Long userId){
        userService.changeUserRoleToAdmin(userId);
    }
}
