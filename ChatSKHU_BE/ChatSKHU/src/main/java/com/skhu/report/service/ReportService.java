package com.skhu.report.service;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Sort;
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

	@Data
	@AllArgsConstructor
	public class Order {
		int value;
		String label;
	}

	Order[] orders = new Order[] {
			new Order(0, "정렬 순서"),
			new Order(1, "학번 오름차순"),
			new Order(2, "학번 내림차순"),
			new Order(3, "이름 오름차순"),
			new Order(4, "학과 오름차순")
	};

	static Sort[] sorts = new Sort[] {
			Sort.by(Sort.Direction.ASC, "id"),
			Sort.by(Sort.Direction.ASC, "studentNo"),
			Sort.by(Sort.Direction.DESC, "studentNo"),
			Sort.by(Sort.Direction.ASC, "name"),
			Sort.by(Sort.Direction.ASC, "department.name"),
	};
	
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
	public void reportDelete(Long reportId) {
		Report report = reportRepository.findById(reportId).orElseThrow();
		reportRepository.delete(report);
	}
	
	@Transactional
	public void updateAnswer(Long reportId, ReportDto.ReportAddAnswer reportAddAnswer, String email) {
		Report report = reportRepository.findById(reportId).orElseThrow();
		report.setAnswer(reportAddAnswer.getAnswer());
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


//	public List<Report> findAll(Pagination pagination) {
//		int orderIndex = pagination.getOd();
//		PageRequest pageRequest = PageRequest.of(pagination.getPg() - 1,
//				pagination.getSz(), sorts[orderIndex]);
//		Page<Student> page;
//		if (pagination.getSt().isEmpty())
//			page = reportRepository.findBy
//	}
}