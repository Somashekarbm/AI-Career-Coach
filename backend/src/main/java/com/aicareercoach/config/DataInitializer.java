package com.aicareercoach.config;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.aicareercoach.domain.Goal;
import com.aicareercoach.domain.JobRole;
import com.aicareercoach.domain.Roadmap;
import com.aicareercoach.domain.Task;
import com.aicareercoach.domain.User;
import com.aicareercoach.repository.GoalRepository;
import com.aicareercoach.repository.RoadmapRepository;
import com.aicareercoach.repository.TaskRepository;
import com.aicareercoach.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializeData() {
        // Use a separate thread to avoid blocking startup
        new Thread(() -> {
            try {
                // Wait for database to be ready
                Thread.sleep(3000);
                
                // Retry mechanism
                int maxRetries = 5;
                int retryCount = 0;
                
                while (retryCount < maxRetries) {
                    try {
                        // Check if tables exist by trying to count users
                        long userCount = userRepository.count();
                        
                        // Only initialize if no users exist
                        if (userCount == 0) {
                            initializeTestData();
                        }
                        break; // Success, exit retry loop
                        
                    } catch (Exception e) {
                        retryCount++;
                        System.out.println("Attempt " + retryCount + " failed, retrying in 2 seconds...");
                        if (retryCount < maxRetries) {
                            Thread.sleep(2000);
                        } else {
                            System.err.println("Failed to initialize data after " + maxRetries + " attempts: " + e.getMessage());
                        }
                    }
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.err.println("Data initialization interrupted: " + e.getMessage());
            }
        }).start();
    }

    private void initializeTestData() {
        try {
            System.out.println("Starting test data initialization...");
            
            // Check if soma3 user already exists
            Optional<User> existingUser = userRepository.findByEmail("soma3@example.com");
            User user;
            
            if (existingUser.isPresent()) {
                user = existingUser.get();
                System.out.println("Found existing user: " + user.getEmail());
            } else {
                // Create test user - using soma3 credentials
                user = new User();
                user.setFirstName("Soma");
                user.setLastName("User");
                user.setEmail("soma3@example.com");
                user.setPassword(passwordEncoder.encode("password"));
                user.setCurrentRole(JobRole.TECH_SUPPORT);
                user.setYearsOfExperience(2);
                user.setIsActive(true);
                user.setEmailVerified(true);
                user.setCreatedAt(LocalDateTime.now());
                user.setUpdatedAt(LocalDateTime.now());
                
                user = userRepository.save(user);
                System.out.println("Created test user: " + user.getEmail());
            }

            // Check if user already has goals
            List<Goal> existingGoals = goalRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
            if (!existingGoals.isEmpty()) {
                System.out.println("User already has " + existingGoals.size() + " goals, skipping goal creation");
                return;
            }

            // Create test goal
            Goal goal = new Goal();
            goal.setUserId(user.getId());
            goal.setTitle("Become Full Stack Developer");
            goal.setDescription("Transition from tech support to full stack development");
            goal.setCategory("career");
            goal.setDailyHours(2.0);
            goal.setDeadline(LocalDateTime.now().plusMonths(6));
            goal.setStatus("active");
            goal.setCreatedAt(LocalDateTime.now());
            goal.setUpdatedAt(LocalDateTime.now());
            
            goal = goalRepository.save(goal);
            System.out.println("Created test goal: " + goal.getTitle());

            // Create test roadmap
            Roadmap roadmap = new Roadmap();
            roadmap.setUserId(user.getId());
            roadmap.setGoal(goal);
            roadmap.setTitle("Roadmap for Become Full Stack Developer");
            roadmap.setDescription("Personalized learning path to achieve your goal");
            roadmap.setCreatedAt(LocalDateTime.now());
            
            roadmap = roadmapRepository.save(roadmap);
            System.out.println("Created test roadmap: " + roadmap.getTitle());

            // Create test tasks
            createTask(roadmap, "Learn HTML & CSS Basics", "Complete basic HTML and CSS tutorials", 1, LocalDateTime.now().plusDays(1));
            createTask(roadmap, "JavaScript Fundamentals", "Study JavaScript basics and ES6 features", 2, LocalDateTime.now().plusDays(3));
            createTask(roadmap, "React.js Introduction", "Learn React components and hooks", 3, LocalDateTime.now().plusDays(7));
            createTask(roadmap, "Backend Development", "Learn Node.js and Express.js", 2, LocalDateTime.now().plusDays(10));
            createTask(roadmap, "Database Design", "Learn SQL and database concepts", 2, LocalDateTime.now().plusDays(14));
            createTask(roadmap, "Project Building", "Build a full-stack project", 3, LocalDateTime.now().plusDays(21));

            System.out.println("Test data initialized successfully!");
        } catch (Exception e) {
            System.err.println("Error initializing test data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void createTask(Roadmap roadmap, String title, String description, int priority, LocalDateTime dueDate) {
        Task task = new Task();
        task.setUserId(roadmap.getUserId());
        task.setRoadmap(roadmap);
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setDueDate(dueDate);
        task.setStatus("pending");
        task.setCreatedAt(LocalDateTime.now());
        
        taskRepository.save(task);
        System.out.println("Created task: " + title);
    }
} 