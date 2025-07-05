package com.aicareercoach.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "goaltasks")
public class GoalTask {
    @Id
    private String id;

    private String goalId;

    private Goal goal;

    private String title;

    private String description;

    private Boolean completed = false;

    private LocalDateTime dueDate;

    private Integer priority = 2; // 1 = low, 2 = medium, 3 = high

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<Boolean> subtaskStatus;

    private List<String> checkpoints;
    private List<String> checkpointNotes;
    private String taskNote;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getGoalId() { return goalId; }
    public void setGoalId(String goalId) { this.goalId = goalId; }
    
    public Goal getGoal() { return goal; }
    public void setGoal(Goal goal) { this.goal = goal; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
    
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
    
    public Integer getPriority() { return priority; }
    public void setPriority(Integer priority) { this.priority = priority; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<Boolean> getSubtaskStatus() { return subtaskStatus; }
    public void setSubtaskStatus(List<Boolean> subtaskStatus) { this.subtaskStatus = subtaskStatus; }

    public List<String> getCheckpoints() { return checkpoints; }
    public void setCheckpoints(List<String> checkpoints) { this.checkpoints = checkpoints; }
    public List<String> getCheckpointNotes() { return checkpointNotes; }
    public void setCheckpointNotes(List<String> checkpointNotes) { this.checkpointNotes = checkpointNotes; }
    public String getTaskNote() { return taskNote; }
    public void setTaskNote(String taskNote) { this.taskNote = taskNote; }
} 