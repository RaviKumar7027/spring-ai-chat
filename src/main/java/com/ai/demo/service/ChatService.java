package com.ai.demo.service;

import com.ai.demo.dto.ChatRequestDTO;
import com.ai.demo.dto.ChatResponseDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public ChatResponseDTO chat(ChatRequestDTO request) {

        String aiResponse = chatClient
                .prompt(request.getPrompt())
                .call()
                .content()
                 .replaceAll("\\*\\*", "")  // remove **
                .replaceAll("\\*", "");     // remove bullets;

        return new ChatResponseDTO(aiResponse);
    }
}
