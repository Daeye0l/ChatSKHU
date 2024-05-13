package com.skhu.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import lombok.*;

@Entity
@Getter
@Table(name = "chat")
@NoArgsConstructor
public class Chat extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chat_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User user;
	
	@Column
	private String question;
	
	@Column
	private String answer;

	@Builder
	public Chat(String question, String answer, User user) {
		this.question = question;
		this.answer = answer;
		this.user = user;
	}
}
