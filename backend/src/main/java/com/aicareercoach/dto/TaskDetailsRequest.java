package com.aicareercoach.dto;

import java.time.LocalDateTime;

public class TaskDetailsRequest {
    private String goalId;
    private Integer dayNumber;
    private String mood; // "motivated", "neutral", "tired"
    private String lifeEvent; // "health", "family", "others"
    private String note;
    private Boolean autoSave;
    private Integer timeSpent; // in minutes

    // Default constructor
    public TaskDetailsRequest() {}

    // Constructor with all fields
    public TaskDetailsRequest(String goalId, Integer dayNumber, String mood, 
                             String lifeEvent, String note, Boolean autoSave, Integer timeSpent) {
        this.goalId = goalId;
        this.dayNumber = dayNumber;
        this.mood = mood;
        this.lifeEvent = lifeEvent;
        this.note = note;
        this.autoSave = autoSave;
        this.timeSpent = timeSpent;
    }

    // Getters and setters
    public String getGoalId() { return goalId; }
    public void setGoalId(String goalId) { this.goalId = goalId; }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getLifeEvent() { return lifeEvent; }
    public void setLifeEvent(String lifeEvent) { this.lifeEvent = lifeEvent; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public Boolean getAutoSave() { return autoSave; }
    public void setAutoSave(Boolean autoSave) { this.autoSave = autoSave; }

    public Integer getTimeSpent() { return timeSpent; }
    public void setTimeSpent(Integer timeSpent) { this.timeSpent = timeSpent; }
} 