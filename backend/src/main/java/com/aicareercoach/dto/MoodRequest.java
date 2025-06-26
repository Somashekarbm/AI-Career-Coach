package com.aicareercoach.dto;

import jakarta.validation.constraints.NotBlank;

public class MoodRequest {
    @NotBlank(message = "Mood is required")
    private String mood;

    public MoodRequest() {}

    public MoodRequest(String mood) {
        this.mood = mood;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }
} 