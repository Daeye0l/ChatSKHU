package com.skhu.report.repository;

import com.skhu.report.domain.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
	List<Report> findByUserIdOrderByCreatedDateDesc(Long userId);

	Page<Report> findByUserNicknameStartsWithOrTitleStartsWith(String userNickname, String title, Pageable pageable);
}