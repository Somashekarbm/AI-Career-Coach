package com.aicareercoach.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TaskDetailsResponse {
    private String goalId;
    private String goalTitle;
    private LocalDateTime deadline;
    private Integer totalDays;
    private Integer currentDay;
    private Double overallProgress;
    private Integer totalPoints;
    private List<DayTask> currentDayTasks;
    private DayData currentDayData;
    private TimeRemaining timeRemaining;
    private Boolean autoSave;

    // Default constructor
    public TaskDetailsResponse() {}

    // Constructor with all fields
    public TaskDetailsResponse(String goalId, String goalTitle, LocalDateTime deadline,
                              Integer totalDays, Integer currentDay, Double overallProgress,
                              Integer totalPoints, List<DayTask> currentDayTasks,
                              DayData currentDayData, TimeRemaining timeRemaining, Boolean autoSave) {
        this.goalId = goalId;
        this.goalTitle = goalTitle;
        this.deadline = deadline;
        this.totalDays = totalDays;
        this.currentDay = currentDay;
        this.overallProgress = overallProgress;
        this.totalPoints = totalPoints;
        this.currentDayTasks = currentDayTasks;
        this.currentDayData = currentDayData;
        this.timeRemaining = timeRemaining;
        this.autoSave = autoSave;
    }

    // Inner class for day tasks
    public static class DayTask {
        private String id;
        private String name;
        private Boolean completed;
        private Integer points;
        private String estimatedTime;
        private Integer timeSpent; // in minutes

        // Default constructor
        public DayTask() {}

        // Constructor with all fields
        public DayTask(String id, String name, Boolean completed, 
                      Integer points, String estimatedTime, Integer timeSpent) {
            this.id = id;
            this.name = name;
            this.completed = completed;
            this.points = points;
            this.estimatedTime = estimatedTime;
            this.timeSpent = timeSpent;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Boolean getCompleted() { return completed; }
        public void setCompleted(Boolean completed) { this.completed = completed; }

        public Integer getPoints() { return points; }
        public void setPoints(Integer points) { this.points = points; }

        public String getEstimatedTime() { return estimatedTime; }
        public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }

        public Integer getTimeSpent() { return timeSpent; }
        public void setTimeSpent(Integer timeSpent) { this.timeSpent = timeSpent; }
    }

    // Inner class for day data
    public static class DayData {
        private String mood;
        private String lifeEvent;
        private String note;
        private LocalDateTime timestamp;

        // Default constructor
        public DayData() {}

        // Constructor with all fields
        public DayData(String mood, String lifeEvent, String note, LocalDateTime timestamp) {
            this.mood = mood;
            this.lifeEvent = lifeEvent;
            this.note = note;
            this.timestamp = timestamp;
        }

        // Getters and setters
        public String getMood() { return mood; }
        public void setMood(String mood) { this.mood = mood; }

        public String getLifeEvent() { return lifeEvent; }
        public void setLifeEvent(String lifeEvent) { this.lifeEvent = lifeEvent; }

        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }

        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    }

    // Inner class for time remaining
    public static class TimeRemaining {
        private Integer days;
        private Integer hours;
        private Integer minutes;

        // Default constructor
        public TimeRemaining() {}

        // Constructor with all fields
        public TimeRemaining(Integer days, Integer hours, Integer minutes) {
            this.days = days;
            this.hours = hours;
            this.minutes = minutes;
        }

        // Getters and setters
        public Integer getDays() { return days; }
        public void setDays(Integer days) { this.days = days; }

        public Integer getHours() { return hours; }
        public void setHours(Integer hours) { this.hours = hours; }

        public Integer getMinutes() { return minutes; }
        public void setMinutes(Integer minutes) { this.minutes = minutes; }
    }

    // Getters and setters
    public String getGoalId() { return goalId; }
    public void setGoalId(String goalId) { this.goalId = goalId; }

    public String getGoalTitle() { return goalTitle; }
    public void setGoalTitle(String goalTitle) { this.goalTitle = goalTitle; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public Integer getTotalDays() { return totalDays; }
    public void setTotalDays(Integer totalDays) { this.totalDays = totalDays; }

    public Integer getCurrentDay() { return currentDay; }
    public void setCurrentDay(Integer currentDay) { this.currentDay = currentDay; }

    public Double getOverallProgress() { return overallProgress; }
    public void setOverallProgress(Double overallProgress) { this.overallProgress = overallProgress; }

    public Integer getTotalPoints() { return totalPoints; }
    public void setTotalPoints(Integer totalPoints) { this.totalPoints = totalPoints; }

    public List<DayTask> getCurrentDayTasks() { return currentDayTasks; }
    public void setCurrentDayTasks(List<DayTask> currentDayTasks) { this.currentDayTasks = currentDayTasks; }

    public DayData getCurrentDayData() { return currentDayData; }
    public void setCurrentDayData(DayData currentDayData) { this.currentDayData = currentDayData; }

    public TimeRemaining getTimeRemaining() { return timeRemaining; }
    public void setTimeRemaining(TimeRemaining timeRemaining) { this.timeRemaining = timeRemaining; }

    public Boolean getAutoSave() { return autoSave; }
    public void setAutoSave(Boolean autoSave) { this.autoSave = autoSave; }
} 