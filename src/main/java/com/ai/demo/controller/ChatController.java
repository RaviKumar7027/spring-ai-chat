package com.ai.demo.controller;


import com.ai.demo.dto.ChatRequestDTO;
import com.ai.demo.dto.ChatResponseDTO;
import com.ai.demo.service.ChatService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponseDTO chat(@Valid @RequestBody ChatRequestDTO request) {
        return chatService.chat(request);
    }
}
