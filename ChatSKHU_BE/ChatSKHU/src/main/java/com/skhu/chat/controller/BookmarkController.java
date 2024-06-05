package com.skhu.chat.controller;

import com.skhu.chat.dto.ChatDto;
import com.skhu.chat.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    @PostMapping("/{chatId}")
    public ResponseEntity<ChatDto.ChatSearchResponse> bookmark(@PathVariable("chatId") Long chatId, Principal principal){
        return ResponseEntity.ok(bookmarkService.Bookmark(chatId, principal.getName()));
    }

    @GetMapping()
    public ResponseEntity<List<ChatDto.ChatSearchResponse>> bookmarkList(Principal principal){
        return ResponseEntity.ok(bookmarkService.getBookmarkChatList(principal.getName()));
    }
}
