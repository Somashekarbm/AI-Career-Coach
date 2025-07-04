package com.aicareercoach.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.aicareercoach.domain.Goal;
import com.aicareercoach.domain.GoalTask;

@Service
public class HardcodedTemplateService {

    public List<GoalTask> generateTasksForGoal(Goal goal) {
        System.out.println("HardcodedTemplateService.generateTasksForGoal called for goal: " + goal.getTitle());
        String goalTitle = goal.getTitle().toLowerCase();
        
        if (goalTitle.contains("full stack") || goalTitle.contains("developer")) {
            System.out.println("Generating Full Stack Developer tasks");
            return generateFullStackDeveloperTasks(goal);
        } else if (goalTitle.contains("frontend") || goalTitle.contains("react")) {
            System.out.println("Generating Frontend Developer tasks");
            return generateFrontendDeveloperTasks(goal);
        } else if (goalTitle.contains("backend") || goalTitle.contains("java")) {
            System.out.println("Generating Backend Developer tasks");
            return generateBackendDeveloperTasks(goal);
        } else {
            System.out.println("Generating Generic Career tasks");
            return generateGenericCareerTasks(goal);
        }
    }

    private List<GoalTask> generateFullStackDeveloperTasks(Goal goal) {
        List<GoalTask> tasks = new ArrayList<>();
        LocalDate startDate = LocalDate.now();
        LocalDate deadline = goal.getDeadline().toLocalDate();
        long totalDays = ChronoUnit.DAYS.between(startDate, deadline);
        
        System.out.println("Generating Full Stack tasks from " + startDate + " to " + deadline + " (" + totalDays + " days)");
        
        // HTML Module (Days 1-10) - 3 tasks per day
        List<List<String>> htmlDailyTasks = List.of(
            List.of("Learn HTML basics and document structure", "Practice creating basic HTML elements", "Set up your development environment"),
            List.of("Practice creating semantic HTML elements", "Learn about HTML5 semantic tags", "Build a simple webpage structure"),
            List.of("Build a simple personal website with HTML", "Add navigation and footer sections", "Practice with different HTML elements"),
            List.of("Learn HTML forms and input validation", "Create contact forms and surveys", "Practice form styling and validation"),
            List.of("Practice accessibility best practices", "Learn ARIA attributes and roles", "Test website accessibility"),
            List.of("Create a responsive HTML layout", "Learn about viewport meta tag", "Practice mobile-first design"),
            List.of("Build a portfolio page with HTML", "Add project sections and descriptions", "Include contact information"),
            List.of("Learn HTML5 semantic elements", "Practice with article, section, aside", "Improve document structure"),
            List.of("Practice HTML debugging and validation", "Use browser developer tools", "Validate HTML with W3C validator"),
            List.of("Review and refine HTML skills", "Build a complete HTML project", "Prepare for CSS learning")
        );
        
        // CSS Module (Days 11-20) - 3 tasks per day
        List<List<String>> cssDailyTasks = List.of(
            List.of("Learn CSS basics and selectors", "Practice CSS syntax and rules", "Set up CSS file structure"),
            List.of("Practice CSS box model and layout", "Learn margin, padding, border", "Create basic layouts"),
            List.of("Learn CSS Flexbox fundamentals", "Practice flex container properties", "Create flexible layouts"),
            List.of("Practice CSS Grid layout", "Learn grid container and items", "Create complex grid layouts"),
            List.of("Build responsive designs with CSS", "Learn media queries", "Practice mobile-first design"),
            List.of("Learn CSS animations and transitions", "Practice keyframe animations", "Create smooth transitions"),
            List.of("Practice CSS best practices", "Learn CSS organization", "Optimize CSS performance"),
            List.of("Create a modern CSS framework", "Build reusable components", "Practice CSS architecture"),
            List.of("Learn CSS preprocessors (Sass/SCSS)", "Practice variables and mixins", "Set up Sass compilation"),
            List.of("Review and refine CSS skills", "Build a complete CSS project", "Prepare for JavaScript learning")
        );
        
        // JavaScript Module (Days 21-40) - 2-3 tasks per day
        List<List<String>> jsDailyTasks = List.of(
            List.of("Learn JavaScript basics and syntax", "Practice variables and data types", "Set up JavaScript environment"),
            List.of("Practice variables, data types, and operators", "Learn about let, const, var", "Practice mathematical operations"),
            List.of("Learn functions and scope in JavaScript", "Practice function declarations", "Understand scope and closures"),
            List.of("Practice arrays and array methods", "Learn map, filter, reduce", "Build array manipulation skills"),
            List.of("Learn objects and object-oriented programming", "Practice object creation", "Understand prototypes"),
            List.of("Practice DOM manipulation", "Learn querySelector and getElementById", "Manipulate HTML elements"),
            List.of("Learn event handling and listeners", "Practice click, submit events", "Handle user interactions"),
            List.of("Practice asynchronous JavaScript (callbacks)", "Learn about callback functions", "Handle async operations"),
            List.of("Learn Promises and async/await", "Practice Promise syntax", "Handle async data fetching"),
            List.of("Practice error handling and debugging", "Learn try-catch blocks", "Use browser debugging tools"),
            List.of("Learn ES6+ features (arrow functions, destructuring)", "Practice modern JavaScript syntax", "Use template literals"),
            List.of("Practice modules and imports/exports", "Learn ES6 modules", "Organize JavaScript code"),
            List.of("Learn JavaScript testing with Jest", "Write unit tests", "Practice test-driven development"),
            List.of("Practice API calls with fetch/axios", "Learn REST API concepts", "Handle JSON data"),
            List.of("Learn local storage and session storage", "Practice data persistence", "Build simple apps"),
            List.of("Practice JavaScript best practices", "Learn code organization", "Follow coding standards"),
            List.of("Build a JavaScript calculator app", "Practice DOM manipulation", "Handle user input"),
            List.of("Create a todo list with JavaScript", "Practice CRUD operations", "Manage application state"),
            List.of("Build a weather app with APIs", "Practice API integration", "Handle external data"),
            List.of("Review and refine JavaScript skills", "Build a complete JS project", "Prepare for React learning")
        );
        
        // React Module (Days 41-70) - 2-3 tasks per day
        List<List<String>> reactDailyTasks = List.of(
            List.of("Learn React basics and JSX", "Set up React development environment", "Create your first React app"),
            List.of("Practice React components and props", "Create functional components", "Pass data with props"),
            List.of("Learn React state and lifecycle", "Practice useState hook", "Understand component lifecycle"),
            List.of("Practice React hooks (useState, useEffect)", "Learn useEffect for side effects", "Practice custom hooks"),
            List.of("Learn React event handling", "Practice event handlers", "Handle form submissions"),
            List.of("Practice conditional rendering", "Use ternary operators", "Implement conditional logic"),
            List.of("Learn React lists and keys", "Practice mapping over arrays", "Understand key prop importance"),
            List.of("Practice React forms and controlled components", "Create controlled inputs", "Handle form state"),
            List.of("Learn React routing with React Router", "Set up routing", "Create navigation"),
            List.of("Practice React context and state management", "Learn Context API", "Manage global state"),
            List.of("Learn React custom hooks", "Create reusable hooks", "Practice hook composition"),
            List.of("Practice React performance optimization", "Learn React.memo", "Optimize re-renders"),
            List.of("Learn React testing with React Testing Library", "Write component tests", "Practice testing patterns"),
            List.of("Practice React deployment and build process", "Build for production", "Deploy to hosting platform"),
            List.of("Build a React todo app", "Practice CRUD operations", "Manage component state"),
            List.of("Create a React blog application", "Practice routing", "Handle dynamic content"),
            List.of("Build a React e-commerce site", "Practice complex state management", "Handle user interactions"),
            List.of("Practice React with TypeScript", "Learn TypeScript basics", "Add type safety"),
            List.of("Learn React advanced patterns", "Practice higher-order components", "Learn render props"),
            List.of("Review and refine React skills", "Build a complete React project", "Practice best practices"),
            List.of("Build a full-stack React project", "Integrate with backend", "Handle API calls"),
            List.of("Practice React with backend integration", "Connect to REST APIs", "Handle authentication"),
            List.of("Learn React authentication", "Implement user login", "Handle protected routes"),
            List.of("Practice React with databases", "Connect to database", "Handle data persistence"),
            List.of("Build a complete React portfolio", "Showcase your projects", "Add contact forms"),
            List.of("Learn React deployment strategies", "Deploy to various platforms", "Optimize for production"),
            List.of("Practice React best practices", "Follow coding standards", "Optimize performance"),
            List.of("Review and refine full-stack skills", "Build a complete application", "Practice deployment"),
            List.of("Prepare for job applications and interviews", "Polish your portfolio", "Practice coding challenges")
        );
        
        // Combine all daily task lists
        List<List<String>> allDailyTasks = new ArrayList<>();
        allDailyTasks.addAll(htmlDailyTasks);
        allDailyTasks.addAll(cssDailyTasks);
        allDailyTasks.addAll(jsDailyTasks);
        allDailyTasks.addAll(reactDailyTasks);
        
        // Generate tasks for each day
        LocalDate currentDate = startDate;
        int dayIndex = 0;
        
        while (currentDate.isBefore(deadline) && dayIndex < allDailyTasks.size()) {
            List<String> dayTasks = allDailyTasks.get(dayIndex);
            
            // Create 2-3 tasks for this day
            for (int taskIndex = 0; taskIndex < dayTasks.size(); taskIndex++) {
                GoalTask task = new GoalTask();
                task.setGoalId(goal.getId());
                task.setGoal(goal);
                task.setTitle(dayTasks.get(taskIndex));
                task.setDescription("Daily learning task " + (taskIndex + 1) + " for " + goal.getTitle());
                task.setCompleted(false);
                task.setDueDate(currentDate.atStartOfDay());
                task.setPriority(taskIndex == 0 ? 3 : taskIndex == 1 ? 2 : 1); // High, Medium, Low priority
                task.setCreatedAt(LocalDateTime.now());
                task.setUpdatedAt(LocalDateTime.now());
                
                tasks.add(task);
            }
            
            dayIndex++;
            currentDate = currentDate.plusDays(1);
        }
        
        // If we have more days than tasks, add review tasks
        while (currentDate.isBefore(deadline)) {
            List<String> reviewTasks = List.of(
                "Review and practice previous concepts",
                "Work on personal projects",
                "Practice coding challenges"
            );
            
            for (int taskIndex = 0; taskIndex < reviewTasks.size(); taskIndex++) {
                GoalTask reviewTask = new GoalTask();
                reviewTask.setGoalId(goal.getId());
                reviewTask.setGoal(goal);
                reviewTask.setTitle(reviewTasks.get(taskIndex));
                reviewTask.setDescription("Review and practice task " + (taskIndex + 1) + " for " + goal.getTitle());
                reviewTask.setCompleted(false);
                reviewTask.setDueDate(currentDate.atStartOfDay());
                reviewTask.setPriority(taskIndex == 0 ? 2 : 1); // Medium, Low priority for review tasks
                reviewTask.setCreatedAt(LocalDateTime.now());
                reviewTask.setUpdatedAt(LocalDateTime.now());
                
                tasks.add(reviewTask);
            }
            
            currentDate = currentDate.plusDays(1);
        }
        
        System.out.println("Generated " + tasks.size() + " tasks for Full Stack Developer goal");
        return tasks;
    }

    private List<GoalTask> generateFrontendDeveloperTasks(Goal goal) {
        // Similar structure but focused on frontend technologies
        List<GoalTask> tasks = new ArrayList<>();
        // Implementation would be similar to full stack but focused on frontend
        return tasks;
    }

    private List<GoalTask> generateBackendDeveloperTasks(Goal goal) {
        // Similar structure but focused on backend technologies
        List<GoalTask> tasks = new ArrayList<>();
        // Implementation would be similar to full stack but focused on backend
        return tasks;
    }

    private List<GoalTask> generateGenericCareerTasks(Goal goal) {
        List<GoalTask> tasks = new ArrayList<>();
        LocalDate startDate = LocalDate.now();
        LocalDate deadline = goal.getDeadline().toLocalDate();
        
        // Generic career tasks organized by day (2-3 tasks per day)
        List<List<String>> genericDailyTasks = List.of(
            List.of("Research and understand the career field", "Identify key skills and requirements", "Create a learning plan and timeline"),
            List.of("Start with foundational knowledge", "Practice basic skills and concepts", "Set up your learning environment"),
            List.of("Build a portfolio or project", "Practice hands-on skills", "Document your learning progress"),
            List.of("Network with professionals in the field", "Join relevant communities", "Attend industry events"),
            List.of("Apply for entry-level positions", "Prepare your resume", "Practice interview skills"),
            List.of("Prepare for interviews and assessments", "Research common questions", "Practice mock interviews"),
            List.of("Continue learning and skill development", "Stay updated with industry trends", "Build advanced skills")
        );
        
        // Generate tasks for each day
        LocalDate currentDate = startDate;
        int dayIndex = 0;
        
        while (currentDate.isBefore(deadline) && dayIndex < genericDailyTasks.size()) {
            List<String> dayTasks = genericDailyTasks.get(dayIndex);
            
            // Create 2-3 tasks for this day
            for (int taskIndex = 0; taskIndex < dayTasks.size(); taskIndex++) {
                GoalTask task = new GoalTask();
                task.setGoalId(goal.getId());
                task.setGoal(goal);
                task.setTitle(dayTasks.get(taskIndex));
                task.setDescription("Career development task " + (taskIndex + 1) + " for " + goal.getTitle());
                task.setCompleted(false);
                task.setDueDate(currentDate.atStartOfDay());
                task.setPriority(taskIndex == 0 ? 3 : taskIndex == 1 ? 2 : 1); // High, Medium, Low priority
                task.setCreatedAt(LocalDateTime.now());
                task.setUpdatedAt(LocalDateTime.now());
                
                tasks.add(task);
            }
            
            dayIndex++;
            currentDate = currentDate.plusDays(1);
        }
        
        // If we have more days than tasks, add review tasks
        while (currentDate.isBefore(deadline)) {
            List<String> reviewTasks = List.of(
                "Review and practice previous concepts",
                "Work on personal projects",
                "Continue skill development"
            );
            
            for (int taskIndex = 0; taskIndex < reviewTasks.size(); taskIndex++) {
                GoalTask reviewTask = new GoalTask();
                reviewTask.setGoalId(goal.getId());
                reviewTask.setGoal(goal);
                reviewTask.setTitle(reviewTasks.get(taskIndex));
                reviewTask.setDescription("Review and practice task " + (taskIndex + 1) + " for " + goal.getTitle());
                reviewTask.setCompleted(false);
                reviewTask.setDueDate(currentDate.atStartOfDay());
                reviewTask.setPriority(taskIndex == 0 ? 2 : 1); // Medium, Low priority for review tasks
                reviewTask.setCreatedAt(LocalDateTime.now());
                reviewTask.setUpdatedAt(LocalDateTime.now());
                
                tasks.add(reviewTask);
            }
            
            currentDate = currentDate.plusDays(1);
        }
        
        return tasks;
    }
} 