package com.aicareercoach.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aicareercoach.domain.Goal;
import com.aicareercoach.domain.GoalTask;
import com.aicareercoach.domain.User;
import com.aicareercoach.dto.GoalRequest;
import com.aicareercoach.dto.GoalResponse;
import com.aicareercoach.dto.GoalTaskResponse;
import com.aicareercoach.repository.GoalRepository;
import com.aicareercoach.repository.GoalTaskRepository;
import com.aicareercoach.repository.UserRepository;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private GoalTaskRepository goalTaskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HardcodedTemplateService templateService;

    public List<GoalResponse> getAllGoalsByUserId(String userId) {
        List<Goal> goals = goalRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> getGoalsByCategory(String userId, String category) {
        List<Goal> goals = goalRepository.findByUserIdAndCategoryOrderByCreatedAtDesc(userId, category);
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> searchGoals(String userId, String searchTerm) {
        List<Goal> goals = goalRepository.findByUserIdAndTitleContainingIgnoreCaseOrUserIdAndDescriptionContainingIgnoreCase(
            userId, searchTerm, userId, searchTerm);
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> getGoalsSorted(String userId, String sortBy) {
        List<Goal> goals;
        switch (sortBy) {
            case "deadline":
                goals = goalRepository.findByUserIdOrderByDeadlineAsc(userId);
                break;
            case "dailyHours":
                goals = goalRepository.findByUserIdOrderByDailyHoursDesc(userId);
                break;
            case "progress":
                goals = goalRepository.findByUserIdOrderByProgressPercentageDesc(userId);
                break;
            default: // createdAt
                goals = goalRepository.findByUserIdOrderByCreatedAtDesc(userId);
                break;
        }
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> getGoalsByCategoryAndSort(String userId, String category, String sortBy) {
        List<Goal> goals;
        switch (sortBy) {
            case "deadline":
                goals = goalRepository.findByUserIdAndCategoryOrderByDeadlineAsc(userId, category);
                break;
            case "dailyHours":
                goals = goalRepository.findByUserIdAndCategoryOrderByDailyHoursDesc(userId, category);
                break;
            case "progress":
                goals = goalRepository.findByUserIdAndCategoryOrderByProgressPercentageDesc(userId, category);
                break;
            default: // createdAt
                goals = goalRepository.findByUserIdAndCategoryOrderByCreatedAtDesc(userId, category);
                break;
        }
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public GoalResponse createGoal(String userId, GoalRequest goalRequest) {
        // No need to fetch User object
        Goal goal = new Goal();
        goal.setUserId(userId);
        goal.setTitle(goalRequest.getTitle());
        goal.setDescription(goalRequest.getDescription());
        goal.setCategory(goalRequest.getCategory());
        goal.setDailyHours(goalRequest.getDailyHours());
        goal.setDeadline(goalRequest.getDeadline());
        goal.setStatus("active");
        goal.setCreatedAt(LocalDateTime.now());
        goal.setUpdatedAt(LocalDateTime.now());

        Goal savedGoal = goalRepository.save(goal);
        
        // Generate tasks for the goal
        System.out.println("Generating tasks for goal: " + savedGoal.getTitle());
        List<GoalTask> tasks = templateService.generateTasksForGoal(savedGoal);
        System.out.println("Generated " + tasks.size() + " tasks for goal: " + savedGoal.getTitle());
        
        for (GoalTask task : tasks) {
            try {
                GoalTask savedTask = goalTaskRepository.save(task);
                System.out.println("Saved task: " + savedTask.getTitle() + " for date: " + savedTask.getDueDate());
            } catch (Exception e) {
                System.err.println("Error saving task: " + e.getMessage());
                e.printStackTrace();
            }
        }
        
        return convertToGoalResponse(savedGoal);
    }

    public GoalResponse updateGoal(String userId, String goalId, GoalRequest goalRequest) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        goal.setTitle(goalRequest.getTitle());
        goal.setDescription(goalRequest.getDescription());
        goal.setCategory(goalRequest.getCategory());
        goal.setDailyHours(goalRequest.getDailyHours());
        goal.setDeadline(goalRequest.getDeadline());
        goal.setUpdatedAt(LocalDateTime.now());

        Goal updatedGoal = goalRepository.save(goal);
        return convertToGoalResponse(updatedGoal);
    }

    public void deleteGoal(String userId, String goalId) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        goalRepository.delete(goal);
    }

    public GoalTaskResponse getTodaysTask(String userId, String goalId) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime tomorrow = today.plusDays(1);
        
        GoalTask todaysTask = goalTaskRepository.findByGoalIdAndDueDateBetweenOrderByDueDateAsc(
            goalId, today, tomorrow).stream().findFirst().orElse(null);
        
        if (todaysTask == null) {
            return null;
        }
        
        return convertToGoalTaskResponse(todaysTask);
    }

    public GoalTaskResponse markTaskAsCompleted(String userId, String goalId, String taskId) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        
        GoalTask task = goalTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getGoal().getId().equals(goalId)) {
            throw new RuntimeException("Task does not belong to the specified goal");
        }
        
        task.setCompleted(!task.getCompleted());
        task.setUpdatedAt(LocalDateTime.now());
        
        GoalTask savedTask = goalTaskRepository.save(task);
        
        // Check if all tasks are completed and update goal status
        List<GoalTask> allTasks = goalTaskRepository.findByGoalIdOrderByCreatedAtAsc(goalId);
        boolean allCompleted = allTasks.stream().allMatch(t -> t.getCompleted());
        
        if (allCompleted) {
            goal.setStatus("completed");
            goal.setUpdatedAt(LocalDateTime.now());
            goalRepository.save(goal);
        }
        
        return convertToGoalTaskResponse(savedTask);
    }

    public GoalTaskResponse updateSubtaskStatus(String userId, String goalId, String taskId, List<Boolean> subtaskStatus) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        GoalTask task = goalTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getGoal().getId().equals(goalId)) {
            throw new RuntimeException("Task does not belong to the specified goal");
        }
        task.setSubtaskStatus(subtaskStatus);
        boolean allComplete = subtaskStatus != null && !subtaskStatus.isEmpty() && subtaskStatus.stream().allMatch(Boolean::booleanValue);
        task.setCompleted(allComplete);
        task.setUpdatedAt(LocalDateTime.now());
        // Ensure save is called and all fields are updated
        GoalTask savedTask = goalTaskRepository.save(task);
        return convertToGoalTaskResponse(savedTask);
    }

    public String getUserName(String userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null. Are you missing a valid Authorization header?");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getUsername();
    }

    public Goal getGoalByIdInternal(String goalId, String userId) {
        return goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    // Debug method to get all users (for development only)
    public List<Map<String, Object>> getAllUsersDebug() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("email", user.getEmail());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("createdAt", user.getCreatedAt());
            return userMap;
        }).collect(Collectors.toList());
    }

    private GoalResponse convertToGoalResponse(Goal goal) {
        GoalResponse response = new GoalResponse();
        response.setId(goal.getId());
        response.setTitle(goal.getTitle());
        response.setDescription(goal.getDescription());
        response.setCategory(goal.getCategory());
        response.setDailyHours(goal.getDailyHours());
        response.setDeadline(goal.getDeadline());
        response.setStatus(goal.getStatus());
        response.setCreatedAt(goal.getCreatedAt());
        response.setUpdatedAt(goal.getUpdatedAt());
        
        // Calculate progress and task counts
        List<GoalTask> tasks = goalTaskRepository.findByGoalIdOrderByCreatedAtAsc(goal.getId());
        int totalTasks = tasks.size();
        int completedTasks = (int) tasks.stream().filter(task -> task.getCompleted()).count();
        
        response.setTotalTasks(totalTasks);
        response.setCompletedTasks(completedTasks);
        response.setProgressPercentage(totalTasks > 0 ? (completedTasks * 100) / totalTasks : 0);
        
        // Convert tasks to DTOs
        List<GoalTaskResponse> taskResponses = tasks.stream()
                .map(this::convertToGoalTaskResponse)
                .collect(Collectors.toList());
        response.setTasks(taskResponses);
        
        return response;
    }

    private GoalTaskResponse convertToGoalTaskResponse(GoalTask task) {
        GoalTaskResponse response = new GoalTaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setCompleted(task.getCompleted());
        response.setDueDate(task.getDueDate());
        response.setPriority(task.getPriority());
        response.setCreatedAt(task.getCreatedAt());
        response.setUpdatedAt(task.getUpdatedAt());
        response.setSubtaskStatus(task.getSubtaskStatus());
        return response;
    }
} 