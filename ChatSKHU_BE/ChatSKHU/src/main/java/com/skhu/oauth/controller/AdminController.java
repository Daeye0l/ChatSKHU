package com.skhu.oauth.controller;

import com.skhu.common.UserLevelCheck;
import com.skhu.oauth.dto.UserDto;
import com.skhu.oauth.service.AdminService;
import com.skhu.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.skhu.oauth.domain.UserLevel.ADMIN;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private final ReportService reportService;

    @Operation(summary = "Report 삭제", description = "개선사항 db에서 삭제")
    @DeleteMapping("/{reportId}")
    public void reportDelete(@PathVariable("reportId") Long reportId) {
        reportService.reportDelete(reportId);
    }

    @DeleteMapping("/{id}")
    @UserLevelCheck(level = ADMIN)
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}