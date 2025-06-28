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

    public List<GoalResponse> getAllGoalsByUserId(Long userId) {
        List<Goal> goals = goalRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> getGoalsByCategory(Long userId, String category) {
        List<Goal> goals = goalRepository.findByUserIdAndCategoryOrderByCreatedAtDesc(userId, category);
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> searchGoals(Long userId, String searchTerm) {
        List<Goal> goals = goalRepository.findByUserIdAndSearchTerm(userId, searchTerm);
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> getGoalsSorted(Long userId, String sortBy) {
        List<Goal> goals;
        switch (sortBy) {
            case "deadline":
                goals = goalRepository.findByUserIdOrderByDeadlineAsc(userId);
                break;
            case "dailyHours":
                goals = goalRepository.findByUserIdOrderByDailyHoursDesc(userId);
                break;
            case "progress":
                goals = goalRepository.findByUserIdOrderByProgressDesc(userId);
                break;
            default: // createdAt
                goals = goalRepository.findByUserIdOrderByCreatedAtDesc(userId);
                break;
        }
        return goals.stream()
                .map(this::convertToGoalResponse)
                .collect(Collectors.toList());
    }

    public GoalResponse createGoal(Long userId, GoalRequest goalRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = new Goal();
        goal.setUser(user);
        goal.setTitle(goalRequest.getTitle());
        goal.setDescription(goalRequest.getDescription());
        goal.setCategory(goalRequest.getCategory());
        goal.setDailyHours(goalRequest.getDailyHours());
        goal.setDeadline(goalRequest.getDeadline());
        goal.setStatus("active");
        goal.setCreatedAt(LocalDateTime.now());
        goal.setUpdatedAt(LocalDateTime.now());

        Goal savedGoal = goalRepository.save(goal);
        return convertToGoalResponse(savedGoal);
    }

    public GoalResponse updateGoal(Long userId, Long goalId, GoalRequest goalRequest) {
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

    public void deleteGoal(Long userId, Long goalId) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        goalRepository.delete(goal);
    }

    public String getUserName(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return user.getFirstName() + " " + user.getLastName();
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
        return response;
    }
} 