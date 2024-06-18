package com.skhu.chat.controller;

import com.skhu.chat.dto.ChatDto;
import com.skhu.chat.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
@Tag(name = "BookmarkController", description = "북마크 관련 API")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Operation(summary = "북마크 추가 및 해제", description = "북마크가 이미 설정되어 있으면 해제가 됨")
    @PostMapping("/{chatId}")
    public ResponseEntity<ChatDto.ChatSearchResponse> bookmark(@PathVariable("chatId") Long chatId, Principal principal){
        return ResponseEntity.ok(bookmarkService.Bookmark(chatId, principal.getName()));
    }

    @Operation(summary = "북마크 목록 조회", description = "북마크 설정한 채팅 내용 목록")
    @GetMapping()
    public ResponseEntity<List<ChatDto.ChatSearchResponse>> bookmarkList(Principal principal){
        return ResponseEntity.ok(bookmarkService.getBookmarkChatList(principal.getName()));
    }
}
