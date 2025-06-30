package com.aicareercoach.dto;

import java.time.LocalDateTime;

public class TaskResponse {
    private String id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime dueDate;
    private int priority;
    private String roadmapTitle;

    public TaskResponse() {}

    public TaskResponse(String id, String title, String description, String status, 
                       LocalDateTime dueDate, int priority, String roadmapTitle) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.priority = priority;
        this.roadmapTitle = roadmapTitle;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
    public int getPriority() { return priority; }
    public void setPriority(int priority) { this.priority = priority; }
    public String getRoadmapTitle() { return roadmapTitle; }
    public void setRoadmapTitle(String roadmapTitle) { this.roadmapTitle = roadmapTitle; }
} 