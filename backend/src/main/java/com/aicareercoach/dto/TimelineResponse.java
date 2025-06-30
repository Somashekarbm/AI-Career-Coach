package com.aicareercoach.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TimelineResponse {
    private String goalId;
    private String goalTitle;
    private LocalDateTime deadline;
    private Integer totalDays;
    private Integer currentDay;
    private Double overallProgress;
    private List<DayTask> dailyTasks;
    private String estimatedCompletionDate;
    private String difficultyLevel;
    private String recommendedPace;

    // Default constructor
    public TimelineResponse() {}

    // Constructor with all fields
    public TimelineResponse(String goalId, String goalTitle, LocalDateTime deadline, 
                           Integer totalDays, Integer currentDay, Double overallProgress,
                           List<DayTask> dailyTasks, String estimatedCompletionDate,
                           String difficultyLevel, String recommendedPace) {
        this.goalId = goalId;
        this.goalTitle = goalTitle;
        this.deadline = deadline;
        this.totalDays = totalDays;
        this.currentDay = currentDay;
        this.overallProgress = overallProgress;
        this.dailyTasks = dailyTasks;
        this.estimatedCompletionDate = estimatedCompletionDate;
        this.difficultyLevel = difficultyLevel;
        this.recommendedPace = recommendedPace;
    }

    // Inner class for daily tasks
    public static class DayTask {
        private Integer dayNumber;
        private String title;
        private String description;
        private Integer estimatedHours;
        private Integer points;
        private String status; // "pending", "in-progress", "completed"
        private String resources;
        private String tips;

        // Default constructor
        public DayTask() {}

        // Constructor with all fields
        public DayTask(Integer dayNumber, String title, String description, 
                      Integer estimatedHours, Integer points, String status,
                      String resources, String tips) {
            this.dayNumber = dayNumber;
            this.title = title;
            this.description = description;
            this.estimatedHours = estimatedHours;
            this.points = points;
            this.status = status;
            this.resources = resources;
            this.tips = tips;
        }

        // Getters and setters
        public Integer getDayNumber() { return dayNumber; }
        public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getEstimatedHours() { return estimatedHours; }
        public void setEstimatedHours(Integer estimatedHours) { this.estimatedHours = estimatedHours; }

        public Integer getPoints() { return points; }
        public void setPoints(Integer points) { this.points = points; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getResources() { return resources; }
        public void setResources(String resources) { this.resources = resources; }

        public String getTips() { return tips; }
        public void setTips(String tips) { this.tips = tips; }
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

    public List<DayTask> getDailyTasks() { return dailyTasks; }
    public void setDailyTasks(List<DayTask> dailyTasks) { this.dailyTasks = dailyTasks; }

    public String getEstimatedCompletionDate() { return estimatedCompletionDate; }
    public void setEstimatedCompletionDate(String estimatedCompletionDate) { this.estimatedCompletionDate = estimatedCompletionDate; }

    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public String getRecommendedPace() { return recommendedPace; }
    public void setRecommendedPace(String recommendedPace) { this.recommendedPace = recommendedPace; }
} 