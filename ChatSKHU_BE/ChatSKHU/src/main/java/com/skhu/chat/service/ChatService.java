package com.skhu.chat.service;

import com.skhu.chat.domain.Chat;
import com.skhu.chat.domain.ChatRoom;
import com.skhu.chat.dto.*;
import com.skhu.chat.dto.ChatDto.ChatSearchResponse;
import com.skhu.chat.repository.ChatRepository;
import com.skhu.chat.repository.ChatRoomRepository;
import com.skhu.oauth.domain.User;
import com.skhu.oauth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
	private final ChatRepository chatRepository;
	private final UserRepository userRepository;
	private final RestTemplate restTemplate;
	private final ChatRoomRepository chatRoomRepository;

	@Value("${openai.model}")
	private String model;
	
	@Value("${openai.gpt-api-key}")
	private String apiKey;
	
	@Transactional
	public ChatDto.ChatResponse chat(Long chatRoomId, ChatDto.ChatRequest chatRequest, String email) {

		User user = userRepository.findByEmail(email).orElseThrow();
		FlaskResponse flaskResponse = getPrompt(chatRequest.getQuestion());
		GPTRequest gptRequest = new GPTRequest(model, flaskResponse.getPrompt(), 256);

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + apiKey);
		HttpEntity<GPTRequest> entity = new HttpEntity<>(gptRequest, headers);

		GPTResponse gptResponse = restTemplate.postForObject("https://api.openai.com/v1/chat/completions", entity, GPTResponse.class);
		String answer = gptResponse.getChoices().get(0).getMessage().getContent();
		ChatDto.ChatResponse chatResponse = new ChatDto.ChatResponse();
		chatResponse.setAnswer(answer);

		if(chatRoomId==-1){
			ChatDto.ChatRoomResponse chatRoom = createChatRoom(email);
			chatRoomId = chatRoom.getId();
			chatResponse.setChatRoomId(chatRoomId);
			chatRoomRepository.findById(chatRoomId).get().setTitle(chatRequest.getQuestion());
		}

		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).get();

		save(chatRequest.getQuestion(), answer, user, chatRoom);

		return chatResponse;
	}
//	@Transactional
//	public Flux<Object> chat(ChatDto.ChatRequest chatRequest, String email) {
//		return Flux.create(sink -> {
//		User user = userRepository.findByEmail(email).orElseThrow();
//		FlaskResponse flaskResponse = getPrompt(chatRequest.getQuestion());
//		GPTRequest gptRequest = new GPTRequest(model, flaskResponse.getPrompt(), 256);
//
//		HttpHeaders headers = new HttpHeaders();
//		headers.set("Authorization", "Bearer " + apiKey);
//		HttpEntity<GPTRequest> entity = new HttpEntity<>(gptRequest, headers);
//
//		GPTResponse gptResponse = restTemplate.postForObject("https://api.openai.com/v1/chat/completions", entity, GPTResponse.class);
//		String answer = gptResponse.getChoices().get(0).getMessage().getContent();
//
//		for (char c : answer.toCharArray()) {
//			sink.next(String.valueOf(c));
//		}
//		sink.complete();
//
//		save(chatRequest.getQuestion(), answer, user);
//		}).delayElements(Duration.ofMillis(100));
//	}

//		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).get();
//
//		save(chatRequest.getQuestion(), answer, user, chatRoom);
//		}).delayElements(Duration.ofMillis(100));
	@Transactional
	public void save(String question, String answer, User user, ChatRoom chatRoom) {
		chatRepository.save(Chat.builder()
				.question(question)
				.answer(answer)
				.user(user)
				.chatRoom(chatRoom)
				.build());
	}
	@Transactional
	public FlaskResponse getPrompt(String question) {
		FlaskRequest flaskRequest = new FlaskRequest(question);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<FlaskRequest> entity = new HttpEntity<>(flaskRequest, headers);
		return restTemplate.postForObject("http://localhost:8085/prompt", entity, FlaskResponse.class);
	}
	
	@Transactional
    public List<ChatDto.ChatSearchResponse> getChatList(Long chatRoomId) {
        List<Chat> chats = chatRepository.findByChatRoomIdOrderByCreatedDateDesc(chatRoomId);
        
        return chats.stream().map(chat -> {
        	ChatSearchResponse chatSearchResponse = new ChatSearchResponse();
			chatSearchResponse.setId(chat.getId());
        	chatSearchResponse.setQuestion(chat.getQuestion());
        	chatSearchResponse.setAnswer(chat.getAnswer());
        	chatSearchResponse.setCreatedDate(chat.getCreatedDate());
			chatSearchResponse.setChatRoomId(chatRoomId);
        	return chatSearchResponse;
        }).collect(Collectors.toList());
    }
	
	@Transactional
    public ChatDto.ChatRoomResponse createChatRoom(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();

        ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.builder()
                .user(user)
                .build());
        return ChatDto.ChatRoomResponse.builder()
                .userId(chatRoom.getUser().getId())
                .id(chatRoom.getId())
                .build();
    }

    @Transactional
    public ChatDto.ChatRoomsResponse getChatRooms(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();

        LocalDateTime now = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        List<ChatRoom> today = chatRoomRepository.findChatRoomByUserAndModifiedDate(user, now, now.plusDays(1));
        List<ChatRoom> yesterday = chatRoomRepository.findChatRoomByUserAndModifiedDate(user, now.minusDays(1), now);
        List<ChatRoom> week = chatRoomRepository.findChatRoomByUserAndModifiedDate(user, now.minusDays(7), now.minusDays(1));
        List<ChatRoom> month = chatRoomRepository.findChatRoomByUserAndModifiedDate(user, now.minusDays(30), now.minusDays(7));

        return ChatDto.ChatRoomsResponse.builder()
                .today(convertToDtoList(today))
                .yesterday(convertToDtoList(yesterday))
                .week(convertToDtoList(week))
                .month(convertToDtoList(month))
                .build();
    }

    public List<ChatDto.ChatRoomResponse> convertToDtoList(List<ChatRoom> chatRooms) {
        return chatRooms.stream()
                .map(chatRoom -> {
                    return ChatDto.ChatRoomResponse.builder()
                            .id(chatRoom.getId())
                            .title(chatRoom.getTitle())
                            .userId(chatRoom.getUser().getId())
                            .build();
                })
                .collect(Collectors.toList());
    }


    @Transactional
    public ChatDto.ChatRoomResponse updateChatRoomTitle(ChatDto.ChatRoomUpdateRequest request, Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow();
        chatRoom.setTitle(request.getTitle());
        return ChatDto.ChatRoomResponse
                .builder()
                .title(chatRoom.getTitle())
                .userId(chatRoom.getUser().getId())
                .id(chatRoom.getId())
                .build(); 
    }
}
