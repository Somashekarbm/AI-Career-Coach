package com.aicareercoach.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aicareercoach.config.JwtUtil;
import com.aicareercoach.dto.GoalRequest;
import com.aicareercoach.dto.GoalResponse;
import com.aicareercoach.service.GoalService;

@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = "*")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<GoalResponse>> getAllGoals(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestHeader("Authorization") String token) {
        
        // Extract user ID from JWT token
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(jwtToken);
        
        List<GoalResponse> goals;
        
        if (search != null && !search.trim().isEmpty()) {
            goals = goalService.searchGoals(userId, search);
        } else if (category != null && !"all".equals(category)) {
            // Use combined method for category filtering with sorting
            goals = goalService.getGoalsByCategoryAndSort(userId, category, sortBy);
        } else {
            // For all goals, apply sorting
            if (!"createdAt".equals(sortBy)) {
                goals = goalService.getGoalsSorted(userId, sortBy);
            } else {
                goals = goalService.getAllGoalsByUserId(userId);
            }
        }
        
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponse> getGoalById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(jwtToken);
        
        List<GoalResponse> allGoals = goalService.getAllGoalsByUserId(userId);
        GoalResponse goal = allGoals.stream()
                .filter(g -> g.getId().equals(id))
                .findFirst()
                .orElse(null);
        
        if (goal == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(goal);
    }

    @PostMapping
    public ResponseEntity<GoalResponse> createGoal(
            @RequestBody GoalRequest goalRequest,
            @RequestHeader("Authorization") String token) {
        
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(jwtToken);
        
        GoalResponse newGoal = goalService.createGoal(userId, goalRequest);
        return ResponseEntity.ok(newGoal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalResponse> updateGoal(
            @PathVariable Long id,
            @RequestBody GoalRequest goalRequest,
            @RequestHeader("Authorization") String token) {
        
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(jwtToken);
        
        GoalResponse updatedGoal = goalService.updateGoal(userId, id, goalRequest);
        return ResponseEntity.ok(updatedGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(jwtToken);
        
        goalService.deleteGoal(userId, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/name")
    public ResponseEntity<String> getUserName(@RequestHeader("Authorization") String token) {
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(jwtToken);
        String userName = goalService.getUserName(userId);
        return ResponseEntity.ok(userName);
    }

    // Debug endpoint to check database state
    @GetMapping("/debug/user")
    public ResponseEntity<Map<String, Object>> debugUser(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            Long userId = jwtUtil.getUserIdFromToken(jwtToken);
            String email = jwtUtil.getEmailFromToken(jwtToken);
            
            Map<String, Object> debugInfo = new HashMap<>();
            debugInfo.put("userId", userId);
            debugInfo.put("email", email);
            debugInfo.put("token", jwtToken.substring(0, Math.min(50, jwtToken.length())) + "...");
            
            return ResponseEntity.ok(debugInfo);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Debug endpoint to list all users (for development only)
    @GetMapping("/debug/users")
    public ResponseEntity<List<Map<String, Object>>> debugUsers() {
        try {
            List<Map<String, Object>> users = goalService.getAllUsersDebug();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(List.of(error));
        }
    }
} 