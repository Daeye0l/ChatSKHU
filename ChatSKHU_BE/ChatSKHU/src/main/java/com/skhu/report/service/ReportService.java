package com.skhu.report.service;

import com.skhu.oauth.domain.User;
import com.skhu.oauth.repository.UserRepository;
import com.skhu.report.domain.Pagination;
import com.skhu.report.domain.Report;
import com.skhu.report.dto.ReportDto;
import com.skhu.report.dto.ReportDto.ReportSearchResponse;
import com.skhu.report.repository.ReportRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    @Data
    @AllArgsConstructor
    public class Order {
        int value;
        String label;
    }


    @Transactional
    public ReportDto.ReportResponse reportSave(ReportDto.ReportSaveRequest reportSaveRequest, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Report report = reportRepository.save(Report.builder()
                .title(reportSaveRequest.getTitle())
                .content(reportSaveRequest.getContent())
                .user(user)
                .build());
        ReportDto.ReportResponse reportSaveResponse = new ReportDto.ReportResponse(report.getId(), report.getTitle(), report.getContent(), report.getAnswer());
        return reportSaveResponse;
    }

    @Transactional
    public ReportDto.ReportResponse reportDelete(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        reportRepository.delete(report);
        ReportDto.ReportResponse reportDeleteReponse = new ReportDto.ReportResponse(report.getId(), report.getTitle(), report.getContent(), report.getAnswer());
        return reportDeleteReponse;
    }

    @Transactional
    public ReportDto.ReportResponse reportModify(Long reportId, ReportDto.ReportSaveRequest reportSaveRequest) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        report.setTitle(reportSaveRequest.getTitle());
        report.setContent(reportSaveRequest.getContent());
        reportRepository.save(report);
        ReportDto.ReportResponse reportModifyResponse = new ReportDto.ReportResponse(report.getId(), report.getTitle(), report.getContent(), report.getAnswer());
        return reportModifyResponse;
    }

    @Transactional
    public ReportDto.ReportResponse updateAnswer(Long reportId, ReportDto.ReportAddAnswer reportAddAnswer, String email) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        report.setAnswer(reportAddAnswer.getAnswer());
        reportRepository.save(report);
        ReportDto.ReportResponse updateAnswerResponse = new ReportDto.ReportResponse(report.getId(), report.getTitle(), report.getContent(), report.getAnswer());
        return updateAnswerResponse;
    }

    @Transactional
    public List<ReportDto.ReportSearchResponse> findByUserIdOrderByCreatedDateDesc(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Report> reports = reportRepository.findByUserIdOrderByCreatedDateDesc(user.getId());

        return reports.stream().map(report -> {
            ReportSearchResponse reportSearchResponse = new ReportSearchResponse();
            reportSearchResponse.setId(report.getId());
            reportSearchResponse.setTitle(report.getTitle());
            reportSearchResponse.setContent(report.getContent());
            reportSearchResponse.setAnswer(report.getAnswer());
            reportSearchResponse.setCreatedDate(report.getCreatedDate());
            reportSearchResponse.setModifiedDate(report.getModifiedDate());
            reportSearchResponse.setNickName(user.getNickname());
            return reportSearchResponse;
        }).collect(Collectors.toList());
    }


    public List<ReportSearchResponse> findAll(Pagination pagination) {
        PageRequest pageRequest = PageRequest.of(pagination.getPg() - 1,
                pagination.getSz(),
                Sort.Direction.ASC, "id");
        Page<Report> page;
        if (pagination.getSt().length() == 0)
            page = reportRepository.findAll(pageRequest);
        else
            page = reportRepository.findByUserNicknameStartsWithOrTitleStartsWith(pagination.getSt(), pagination.getSt(), pageRequest);
        pagination.setRecordCount((int)page.getTotalElements());
        return page.getContent().stream()
                .map(this::convertToReportSearchResponse)
                .collect(Collectors.toList());
    }

    private ReportSearchResponse convertToReportSearchResponse(Report report) {
        return new ReportSearchResponse(
                report.getId(),
                report.getTitle(),
                report.getContent(),
                report.getAnswer(),
                report.getCreatedDate(),
                report.getModifiedDate(),
                report.getUser().getNickname() // Assuming Report has a User entity with a getNickName() method
        );
    }
}