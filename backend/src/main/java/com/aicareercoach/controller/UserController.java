package com.aicareercoach.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aicareercoach.domain.Roadmap;
import com.aicareercoach.domain.Task;
import com.aicareercoach.domain.User;
import com.aicareercoach.dto.LifeEventRequest;
import com.aicareercoach.dto.MoodRequest;
import com.aicareercoach.dto.TaskResponse;
import com.aicareercoach.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@Tag(name = "User Management", description = "APIs for user management, goals, roadmaps, and tasks")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    @Operation(summary = "Get user profile", description = "Get user profile information")
    public ResponseEntity<User> getUserProfile(@PathVariable String userId) {
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}/mood")
    @Operation(summary = "Update user mood/energy", description = "Log user's current mood/energy level")
    public ResponseEntity<Map<String, String>> updateMood(
            @PathVariable String userId,
            @Valid @RequestBody MoodRequest moodRequest) {
        
        userService.updateMood(userId, moodRequest.getMood());
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Mood updated successfully");
        response.put("mood", moodRequest.getMood());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/life-event")
    @Operation(summary = "Log life event", description = "Log a life event that affects task scheduling")
    public ResponseEntity<Map<String, String>> logLifeEvent(
            @PathVariable String userId,
            @Valid @RequestBody LifeEventRequest lifeEventRequest) {
        
        userService.logLifeEvent(userId, lifeEventRequest.getEvent());
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Life event logged successfully");
        response.put("event", lifeEventRequest.getEvent());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/roadmaps")
    @Operation(summary = "Get all user roadmaps", description = "Get all roadmaps for a specific user")
    public ResponseEntity<List<Roadmap>> getUserRoadmaps(@PathVariable String userId) {
        List<Roadmap> roadmaps = userService.getUserRoadmaps(userId);
        return ResponseEntity.ok(roadmaps);
    }

    // @PostMapping("/{userId}/goals/{goalId}/roadmap")
    // @Operation(summary = "Generate roadmap", description = "Generate a learning roadmap for a specific goal")
    // public ResponseEntity<Roadmap> generateRoadmap(
    //         @PathVariable Long userId,
    //         @PathVariable Long goalId) {
        
    //     Roadmap roadmap = userService.generateRoadmap(userId, goalId);
    //     return ResponseEntity.ok(roadmap);
    // }

    @GetMapping("/{userId}/tasks")
    @Operation(summary = "Get all user tasks", description = "Get all tasks for a specific user")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable String userId) {
        List<Task> tasks = userService.getUserTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{userId}/tasks/{taskId}")
    @Operation(summary = "Get specific task", description = "Get a specific task by ID")
    public ResponseEntity<Task> getTask(
            @PathVariable String userId,
            @PathVariable String taskId) {
        
        return userService.getTaskById(userId, taskId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{userId}/next-task")
    @Operation(summary = "Get next task", description = "Get the next suggested task based on user's mood and progress")
    public ResponseEntity<TaskResponse> getNextTask(@PathVariable String userId) {
        TaskResponse task = userService.getNextTask(userId);
        
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(task);
    }

    @PostMapping("/{userId}/tasks/{taskId}/complete")
    @Operation(summary = "Complete task", description = "Mark a task as completed")
    public ResponseEntity<Map<String, String>> completeTask(
            @PathVariable String userId,
            @PathVariable String taskId) {
        
        userService.completeTask(userId, taskId);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task completed successfully");
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}/tasks/{taskId}/reschedule")
    @Operation(summary = "Reschedule task", description = "Reschedule a task based on AI suggestions")
    public ResponseEntity<Map<String, String>> rescheduleTask(
            @PathVariable String userId,
            @PathVariable String taskId) {
        
        userService.rescheduleTask(userId, taskId);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task rescheduled successfully");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<User> getUserProfileDetails(@PathVariable String userId) {
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<User> updateUserProfile(@PathVariable String userId, @RequestBody Map<String, Object> updates) {
        try {
            User updated = userService.updateUserProfile(userId, updates);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 