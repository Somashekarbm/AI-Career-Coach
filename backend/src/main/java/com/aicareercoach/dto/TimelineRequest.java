package com.aicareercoach.dto;

import java.time.LocalDateTime;

public class TimelineRequest {
    private String goalId;
    private String goalTitle;
    private String goalDescription;
    private String category;
    private LocalDateTime deadline;
    private Double dailyHours;
    private String userExperience; // "beginner", "intermediate", "advanced"
    private String learningStyle; // "visual", "hands-on", "theoretical"
    private String preferredResources; // "videos", "books", "courses", "projects"

    // Default constructor
    public TimelineRequest() {}

    // Constructor with all fields
    public TimelineRequest(String goalId, String goalTitle, String goalDescription, 
                          String category, LocalDateTime deadline, Double dailyHours,
                          String userExperience, String learningStyle, String preferredResources) {
        this.goalId = goalId;
        this.goalTitle = goalTitle;
        this.goalDescription = goalDescription;
        this.category = category;
        this.deadline = deadline;
        this.dailyHours = dailyHours;
        this.userExperience = userExperience;
        this.learningStyle = learningStyle;
        this.preferredResources = preferredResources;
    }

    // Getters and setters
    public String getGoalId() { return goalId; }
    public void setGoalId(String goalId) { this.goalId = goalId; }

    public String getGoalTitle() { return goalTitle; }
    public void setGoalTitle(String goalTitle) { this.goalTitle = goalTitle; }

    public String getGoalDescription() { return goalDescription; }
    public void setGoalDescription(String goalDescription) { this.goalDescription = goalDescription; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public Double getDailyHours() { return dailyHours; }
    public void setDailyHours(Double dailyHours) { this.dailyHours = dailyHours; }

    public String getUserExperience() { return userExperience; }
    public void setUserExperience(String userExperience) { this.userExperience = userExperience; }

    public String getLearningStyle() { return learningStyle; }
    public void setLearningStyle(String learningStyle) { this.learningStyle = learningStyle; }

    public String getPreferredResources() { return preferredResources; }
    public void setPreferredResources(String preferredResources) { this.preferredResources = preferredResources; }
} 