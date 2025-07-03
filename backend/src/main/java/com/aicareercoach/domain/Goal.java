package com.aicareercoach.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "goals")
public class Goal {
    @Id
    private String id;

    private String userId;

    private String title;

    private String description;

    private String category; // "career", "learning", "health", "personal", "finance"

    private Double dailyHours;

    private LocalDateTime deadline;

    private Integer progressPercentage = 0;

    private Integer totalTasks = 0;

    private Integer completedTasks = 0;

    private String status = "active"; // "active", "completed", "paused", "cancelled"

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @JsonManagedReference
    private List<GoalTask> tasks;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getDailyHours() { return dailyHours; }
    public void setDailyHours(Double dailyHours) { this.dailyHours = dailyHours; }
    
    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }
    
    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }
    
    public Integer getTotalTasks() { return totalTasks; }
    public void setTotalTasks(Integer totalTasks) { this.totalTasks = totalTasks; }
    
    public Integer getCompletedTasks() { return completedTasks; }
    public void setCompletedTasks(Integer completedTasks) { this.completedTasks = completedTasks; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public List<GoalTask> getTasks() { return tasks; }
    public void setTasks(List<GoalTask> tasks) { this.tasks = tasks; }
} 