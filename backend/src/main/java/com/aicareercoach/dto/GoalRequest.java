package com.aicareercoach.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;

public class GoalRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    private String category;
    private Double dailyHours;
    private LocalDateTime deadline;

    public GoalRequest() {}

    public GoalRequest(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getDailyHours() {
        return dailyHours;
    }

    public void setDailyHours(Double dailyHours) {
        this.dailyHours = dailyHours;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }
} 