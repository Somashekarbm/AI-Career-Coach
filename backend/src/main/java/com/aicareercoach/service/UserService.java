package com.aicareercoach.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aicareercoach.domain.LifeEventLog;
import com.aicareercoach.domain.MoodLog;
import com.aicareercoach.domain.Roadmap;
import com.aicareercoach.domain.Task;
import com.aicareercoach.domain.User;
import com.aicareercoach.dto.TaskResponse;
import com.aicareercoach.repository.LifeEventLogRepository;
import com.aicareercoach.repository.MoodLogRepository;
import com.aicareercoach.repository.RoadmapRepository;
import com.aicareercoach.repository.TaskRepository;
import com.aicareercoach.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private MoodLogRepository moodLogRepository;

    @Autowired
    private LifeEventLogRepository lifeEventLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Roadmap> getUserRoadmaps(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return roadmapRepository.findByUser(user);
    }

    public List<Task> getUserTasks(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUser(user);
    }

    public Optional<Task> getTaskById(String userId, String taskId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByIdAndUser(taskId, user);
    }

    public TaskResponse getNextTask(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get user's mood to adjust task difficulty
        String userMood = getUserCurrentMood(userId);
        
        // Get pending tasks
        List<Task> pendingTasks = taskRepository.findByUserAndStatus(user, "pending");
        
        if (pendingTasks.isEmpty()) {
            return null;
        }

        // Simple logic: if tired, suggest easier task (lower priority)
        Task suggestedTask = pendingTasks.get(0); // Default to first task
        
        if ("tired".equals(userMood)) {
            // Find a lower priority task
            suggestedTask = pendingTasks.stream()
                    .filter(task -> task.getPriority() <= 2)
                    .findFirst()
                    .orElse(pendingTasks.get(0));
        }

        return new TaskResponse(
            suggestedTask.getId(),
            suggestedTask.getTitle(),
            suggestedTask.getDescription(),
            suggestedTask.getStatus(),
            suggestedTask.getDueDate(),
            suggestedTask.getPriority(),
            suggestedTask.getRoadmap().getTitle()
        );
    }

    public void updateMood(String userId, String mood) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MoodLog moodLog = new MoodLog();
        moodLog.setUser(user);
        moodLog.setMood(mood);
        moodLog.setCreatedAt(LocalDateTime.now());
        
        moodLogRepository.save(moodLog);
        
        // Reschedule overdue tasks based on mood
        rescheduleOverdueTasks(userId);
    }

    public void logLifeEvent(String userId, String event) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LifeEventLog lifeEventLog = new LifeEventLog();
        lifeEventLog.setUser(user);
        lifeEventLog.setEvent(event);
        lifeEventLog.setCreatedAt(LocalDateTime.now());
        
        lifeEventLogRepository.save(lifeEventLog);
    }

    private void rescheduleOverdueTasks(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Task> overdueTasks = taskRepository.findByUserAndStatus(user, "overdue");
        
        for (Task task : overdueTasks) {
            task.setDueDate(LocalDateTime.now().plusDays(1));
            task.setStatus("pending");
            taskRepository.save(task);
        }
    }

    private String getUserCurrentMood(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<MoodLog> recentMoods = moodLogRepository.findByUserOrderByCreatedAtDesc(user);
        
        if (recentMoods.isEmpty()) {
            return "neutral";
        }
        
        return recentMoods.get(0).getMood();
    }

    public void completeTask(String userId, String taskId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("completed");
        task.setCompletedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        
        taskRepository.save(task);
    }

    public void rescheduleTask(String userId, String taskId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setDueDate(LocalDateTime.now().plusDays(1));
        task.setStatus("pending");
        task.setUpdatedAt(LocalDateTime.now());
        
        taskRepository.save(task);
    }

    public User registerUser(User user) {
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        // Check if username is unique
        if (user.getUsername() == null || user.getUsername().isBlank() ||
            userRepository.findAll().stream()
                .filter(u -> u.getUsername() != null)
                .anyMatch(u -> user.getUsername().equals(u.getUsername()))) {
            throw new RuntimeException("Username already taken or invalid");
        }
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return user;
            }
        }
        
        return null;
    }

    public List<Map<String, Object>> getAllUsersDebug() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("email", user.getEmail());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("createdAt", user.getCreatedAt());
            userMap.put("isActive", user.getIsActive());
            return userMap;
        }).collect(Collectors.toList());
    }

    public User updateUserProfile(String userId, Map<String, Object> updates) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        try {
            if (updates.containsKey("username")) {
                String newUsername = (String) updates.get("username");
                if (!newUsername.equals(user.getUsername()) && userRepository.findAll().stream().anyMatch(u -> newUsername.equals(u.getUsername()))) {
                    throw new RuntimeException("Username already taken");
                }
                user.setUsername(newUsername);
            }
            if (updates.containsKey("learningPreferences")) {
                user.setLearningPreferences((String) updates.get("learningPreferences"));
            }
            if (updates.containsKey("avatar")) {
                user.setAvatar((String) updates.get("avatar"));
            }
            if (updates.containsKey("firstName")) {
                user.setFirstName((String) updates.get("firstName"));
            }
            if (updates.containsKey("lastName")) {
                user.setLastName((String) updates.get("lastName"));
            }
            if (updates.containsKey("email")) {
                String newEmail = (String) updates.get("email");
                if (!newEmail.equals(user.getEmail()) && userRepository.findByEmail(newEmail).isPresent()) {
                    throw new RuntimeException("Email already in use");
                }
                user.setEmail(newEmail);
            }
            if (updates.containsKey("password")) {
                String newPassword = (String) updates.get("password");
                if (newPassword != null && !newPassword.isBlank()) {
                    user.setPassword(passwordEncoder.encode(newPassword));
                }
            }
            if (updates.containsKey("dateOfBirth")) {
                Object dobObj = updates.get("dateOfBirth");
                if (dobObj instanceof String) {
                    String dobStr = (String) dobObj;
                    try {
                        if (dobStr.length() == 10) { // yyyy-MM-dd
                            user.setDateOfBirth(java.time.LocalDate.parse(dobStr, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay());
                        } else {
                            user.setDateOfBirth(java.time.LocalDateTime.parse(dobStr));
                        }
                    } catch (Exception e) {
                        System.err.println("Failed to parse dateOfBirth: " + dobStr);
                        e.printStackTrace();
                    }
                }
            }
            if (updates.containsKey("currentRole")) {
                String roleStr = (String) updates.get("currentRole");
                try {
                    user.setCurrentRole(com.aicareercoach.domain.JobRole.valueOf(roleStr));
                } catch (Exception e) {
                    // If not in enum, store as OTHER and optionally log or store custom
                    user.setCurrentRole(com.aicareercoach.domain.JobRole.OTHER);
                    // Optionally, store custom role in learningPreferences or another field
                    user.setLearningPreferences((user.getLearningPreferences() == null ? "" : user.getLearningPreferences() + "; ") + "CustomRole: " + roleStr);
                }
            }
            if (updates.containsKey("preferredWorkHoursPerDay")) {
                Object hoursObj = updates.get("preferredWorkHoursPerDay");
                if (hoursObj instanceof Number) {
                    user.setPreferredWorkHoursPerDay(((Number) hoursObj).intValue());
                } else if (hoursObj instanceof String) {
                    try {
                        user.setPreferredWorkHoursPerDay(Integer.parseInt((String) hoursObj));
                    } catch (NumberFormatException ignored) {}
                }
            }
            if (updates.containsKey("age")) {
                Object ageObj = updates.get("age");
                int age = 0;
                if (ageObj instanceof Number) {
                    age = ((Number) ageObj).intValue();
                } else if (ageObj instanceof String) {
                    try {
                        age = Integer.parseInt((String) ageObj);
                    } catch (NumberFormatException ignored) {}
                }
                if (age < 10) throw new RuntimeException("Age must be at least 10 years");
                user.setAge(age);
            }
            return userRepository.save(user);
        } catch (Exception e) {
            System.err.println("Error updating user profile: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update user profile: " + e.getMessage());
        }
    }
} 