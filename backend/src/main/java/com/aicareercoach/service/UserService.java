package com.aicareercoach.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aicareercoach.domain.Goal;
import com.aicareercoach.domain.LifeEventLog;
import com.aicareercoach.domain.MoodLog;
import com.aicareercoach.domain.Roadmap;
import com.aicareercoach.domain.Task;
import com.aicareercoach.domain.User;
import com.aicareercoach.dto.GoalRequest;
import com.aicareercoach.dto.TaskResponse;
import com.aicareercoach.repository.GoalRepository;
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
    private GoalRepository goalRepository;

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

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Goal> getUserGoals(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return goalRepository.findByUser(user);
    }

    public Optional<Goal> getGoalById(Long userId, Long goalId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return goalRepository.findByIdAndUser(goalId, user);
    }

    public Goal createGoal(Long userId, GoalRequest goalRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = new Goal();
        goal.setUser(user);
        goal.setTitle(goalRequest.getTitle());
        goal.setDescription(goalRequest.getDescription());
        goal.setStatus("active");
        goal.setCreatedAt(LocalDateTime.now());

        return goalRepository.save(goal);
    }

    public List<Roadmap> getUserRoadmaps(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return roadmapRepository.findByUser(user);
    }

    public Roadmap generateRoadmap(Long userId, Long goalId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        // Hardcoded roadmap generation logic
        Roadmap roadmap = new Roadmap();
        roadmap.setUser(user);
        roadmap.setGoal(goal);
        roadmap.setTitle("Roadmap for " + goal.getTitle());
        roadmap.setDescription("Personalized learning path to achieve your goal");
        roadmap.setCreatedAt(LocalDateTime.now());

        roadmap = roadmapRepository.save(roadmap);

        // Generate hardcoded tasks based on goal
        generateTasksForRoadmap(roadmap, goal.getTitle());

        return roadmap;
    }

    private void generateTasksForRoadmap(Roadmap roadmap, String goalTitle) {
        // Hardcoded task generation based on goal
        List<Task> tasks = List.of(
            createTask(roadmap, "Learn HTML & CSS Basics", "Complete basic HTML and CSS tutorials", 1, LocalDateTime.now().plusDays(1)),
            createTask(roadmap, "JavaScript Fundamentals", "Study JavaScript basics and ES6 features", 2, LocalDateTime.now().plusDays(3)),
            createTask(roadmap, "React.js Introduction", "Learn React components and hooks", 3, LocalDateTime.now().plusDays(7)),
            createTask(roadmap, "Backend Development", "Learn Node.js and Express.js", 2, LocalDateTime.now().plusDays(10)),
            createTask(roadmap, "Database Design", "Learn SQL and database concepts", 2, LocalDateTime.now().plusDays(14)),
            createTask(roadmap, "Project Building", "Build a full-stack project", 3, LocalDateTime.now().plusDays(21))
        );

        taskRepository.saveAll(tasks);
    }

    private Task createTask(Roadmap roadmap, String title, String description, int priority, LocalDateTime dueDate) {
        Task task = new Task();
        task.setUser(roadmap.getUser());
        task.setRoadmap(roadmap);
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setDueDate(dueDate);
        task.setStatus("pending");
        task.setCreatedAt(LocalDateTime.now());
        return task;
    }

    public List<Task> getUserTasks(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUser(user);
    }

    public Optional<Task> getTaskById(Long userId, Long taskId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByIdAndUser(taskId, user);
    }

    public TaskResponse getNextTask(Long userId) {
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

    public void updateMood(Long userId, String mood) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MoodLog moodLog = new MoodLog();
        moodLog.setUser(user);
        moodLog.setMood(mood);
        moodLog.setCreatedAt(LocalDateTime.now());
        
        moodLogRepository.save(moodLog);
    }

    public void logLifeEvent(Long userId, String event) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LifeEventLog lifeEventLog = new LifeEventLog();
        lifeEventLog.setUser(user);
        lifeEventLog.setEvent(event);
        lifeEventLog.setCreatedAt(LocalDateTime.now());
        
        lifeEventLogRepository.save(lifeEventLog);

        // Reschedule tasks if needed
        if ("sick".equals(event) || "no time".equals(event)) {
            rescheduleOverdueTasks(userId);
        }
    }

    private void rescheduleOverdueTasks(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime now = LocalDateTime.now();
        List<Task> overdueTasks = taskRepository.findByUserAndStatusAndDueDateBefore(user, "pending", now);

        for (Task task : overdueTasks) {
            // Move task to tomorrow
            task.setDueDate(now.plusDays(1));
            taskRepository.save(task);
        }
    }

    private String getUserCurrentMood(Long userId) {
        MoodLog latestMood = moodLogRepository.findFirstByUserOrderByCreatedAtDesc(
            userRepository.findById(userId).orElse(null)
        );
        return latestMood != null ? latestMood.getMood() : "neutral";
    }

    public void completeTask(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Task does not belong to user");
        }

        task.setStatus("completed");
        task.setCompletedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

    public void rescheduleTask(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Task does not belong to user");
        }

        // Simple AI logic: reschedule to next day
        task.setDueDate(LocalDateTime.now().plusDays(1));
        taskRepository.save(task);
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsActive(true);
        user.setEmailVerified(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }
} 