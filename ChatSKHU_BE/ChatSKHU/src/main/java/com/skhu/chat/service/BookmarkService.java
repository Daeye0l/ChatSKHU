package com.skhu.chat.service;

import com.skhu.chat.domain.Bookmark;
import com.skhu.chat.domain.Chat;
import com.skhu.chat.dto.ChatDto;
import com.skhu.chat.repository.BookmarkRepository;
import com.skhu.chat.repository.ChatRepository;
import com.skhu.oauth.domain.User;
import com.skhu.oauth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatDto.ChatSearchResponse Bookmark(Long chatId, String email) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();
        User user = userRepository.findByEmail(email).orElseThrow();
        boolean isBookmarked = false;

        if (bookmarkRepository.findByUserAndChat(user, chat).isEmpty()) {
            bookmarkRepository.save(Bookmark.builder()
                    .user(user)
                    .chat(chat)
                    .status(true)
                    .build());
            isBookmarked = true;
        } else {
            bookmarkRepository.deleteByUserAndChat(user, chat);
        }

        return ChatDto.ChatSearchResponse.of(chat, isBookmarked);
    }

    @Transactional
    public List<ChatDto.ChatSearchResponse> getBookmarkChatList(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Bookmark> bookmarks = bookmarkRepository.findByUser(user);

        return bookmarks.stream().map(bookmark -> {
            Chat chat = bookmark.getChat();
            return ChatDto.ChatSearchResponse.of(chat, true);
        }).collect(Collectors.toList());
    }

    @Transactional
    public boolean isChatBookmarkedByUser(Long chatId, String email) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();
        User user = userRepository.findByEmail(email).orElseThrow();
        return bookmarkRepository.findByUserAndChat(user, chat).isPresent();
    }
}
