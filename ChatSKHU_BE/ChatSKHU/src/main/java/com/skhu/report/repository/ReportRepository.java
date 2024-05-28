package com.skhu.report.repository;

import com.skhu.report.domain.Report;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
	List<Report> findByUserIdOrderByCreatedDateDesc(Long userId);

//	List<Report> findByUserNicknameOrTitleStartsWith(String userNickname, String title, )
}