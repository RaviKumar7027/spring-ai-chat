package com.ai.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import javax.validation.constraints.NotNull;

public class ChatRequestDTO {
    @NotBlank(message = "Prompt must not be empty")
    @Size(min = 3, message = "Prompt must have at least 3 characters")
    private String prompt;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
