package com.skhu.report.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skhu.report.domain.Report;
import com.skhu.report.dto.ReportDto;
import com.skhu.report.dto.ReportDto.ReportSearchResponse;
import com.skhu.report.repository.ReportRepository;
import com.skhu.oauth.domain.User;
import com.skhu.oauth.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {
	private final UserRepository userRepository;
	private final ReportRepository reportRepository;
	
	@Transactional
	public void reportSave(ReportDto.ReportSaveRequest reportSaveRequest, String email) {
		User user = userRepository.findByEmail(email).orElseThrow();
		reportRepository.save(Report.builder()
				.title(reportSaveRequest.getTitle())
				.content(reportSaveRequest.getContent())
				.user(user)
				.build());
	}
	
	@Transactional
    public List<ReportDto.ReportSearchResponse> findByUserIdOrderByCreatedDateDesc(String email) {
		User user = userRepository.findByEmail(email).orElseThrow();
        List<Report> reports = reportRepository.findByUserIdOrderByCreatedDateDesc(user.getId());
        
        return reports.stream().map(report -> {
        	ReportSearchResponse reportSearchResponse = new ReportSearchResponse();
        	reportSearchResponse.setTitle(report.getTitle());
        	reportSearchResponse.setContent(report.getContent());
        	reportSearchResponse.setAnswer(report.getAnswer());
        	reportSearchResponse.setCreatedDate(report.getCreatedDate());
        	return reportSearchResponse;
        }).collect(Collectors.toList());
    }
}