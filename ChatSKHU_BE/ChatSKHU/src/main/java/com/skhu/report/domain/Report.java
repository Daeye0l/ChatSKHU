package com.skhu.report.domain;

import com.skhu.common.BaseTimeEntity;
import com.skhu.oauth.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "report")
@NoArgsConstructor
public class Report extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "report_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User user;
	
	@Column(length = 50)
	private String title;
	
	@Column
	private String content;
	
	@Column
	private String answer;
	
	@Builder
	public Report(String title, String content, String answer, User user) {
		this.title = title;
		this.content = content;
		this.answer = answer;
		this.user = user;
	}
}