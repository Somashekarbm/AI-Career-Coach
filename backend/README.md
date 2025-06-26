# AI Career Coach Backend

Spring Boot backend for the AI Career Coach platform with mood/energy tracking and life event handling.

## Features Implemented

### ✅ Core Features
- **User Management**: User profiles and authentication
- **Goal Setting**: Create and manage career goals
- **Roadmap Generation**: Generate learning roadmaps (hardcoded for now)
- **Task Management**: Create, schedule, and track tasks
- **Mood/Energy Tracking**: Log user mood and adapt task suggestions
- **Life Event Handling**: Log life events and reschedule tasks
- **Progress Tracking**: Monitor task completion

### 🔄 Hardcoded Logic (Future AI Replacement)
- **Roadmap Generation**: Fixed set of tasks for "Full Stack Developer" goal
- **Mood-Based Task Selection**: 
  - "tired" → suggests lower priority tasks (priority ≤ 2)
  - "active" → suggests any available task
- **Life Event Handling**: 
  - "sick" or "no time" → reschedules overdue tasks to tomorrow

## Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **API Documentation**: OpenAPI/Swagger
- **Validation**: Bean Validation
- **Testing**: JUnit 5

## Prerequisites

- Java 17+
- Maven 3.8+
- PostgreSQL 13+

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE ai_career_coach;
```

### 2. Configuration

Update `application.yml` with your database credentials:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ai_career_coach
    username: your_username
    password: your_password
```

### 3. Run the Application

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

Once the application is running, visit:
- **Swagger UI**: `http://localhost:8080/api/v1/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/api/v1/api-docs`

## API Endpoints

### User Management
- `GET /api/v1/users/{userId}` - Get user profile

### Goals
- `POST /api/v1/users/{userId}/goals` - Create a new goal
- `POST /api/v1/users/{userId}/goals/{goalId}/roadmap` - Generate roadmap for goal

### Tasks
- `GET /api/v1/users/{userId}/next-task` - Get next suggested task
- `POST /api/v1/users/{userId}/tasks/{taskId}/complete` - Complete a task

### Mood & Life Events
- `POST /api/v1/users/{userId}/mood` - Update user mood/energy
- `POST /api/v1/users/{userId}/life-event` - Log life event

## Sample Flow

### 1. Create Goal
```bash
curl -X POST http://localhost:8080/api/v1/users/1/goals \
  -H "Content-Type: application/json" \
  -d '{"title": "Become Full Stack Developer", "description": "Transition from tech support"}'
```

### 2. Generate Roadmap
```bash
curl -X POST http://localhost:8080/api/v1/users/1/goals/1/roadmap
```

### 3. Update Mood
```bash
curl -X POST http://localhost:8080/api/v1/users/1/mood \
  -H "Content-Type: application/json" \
  -d '{"mood": "tired"}'
```

### 4. Get Next Task
```bash
curl http://localhost:8080/api/v1/users/1/next-task
```

### 5. Log Life Event
```bash
curl -X POST http://localhost:8080/api/v1/users/1/life-event \
  -H "Content-Type: application/json" \
  -d '{"event": "sick"}'
```

## Database Schema

### Core Tables
- `users` - User profiles and authentication
- `goals` - Career objectives
- `roadmaps` - Learning paths
- `tasks` - Individual learning tasks
- `mood_logs` - User mood/energy logs
- `life_event_logs` - Life event logs
- `user_skills` - User skills and proficiency

## Testing

Run tests with:
```bash
mvn test
```

## Future Enhancements

### Phase 2: AI Integration
- Replace hardcoded roadmap generation with GPT API
- Implement dynamic task suggestions
- Add intelligent rescheduling algorithms

### Phase 3: Advanced Features
- Collaborative groups and team chat
- Advanced mood analysis over time
- Priority scoring and buffer day management
- Weekend catch-up mode

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `application.yml`
   - Verify database `ai_career_coach` exists

2. **Port Already in Use**
   - Change port in `application.yml`:
   ```yaml
   server:
     port: 8081
   ```

3. **JPA/Hibernate Errors**
   - Check database schema matches entity definitions
   - Ensure all required tables are created

## Development

### Project Structure
```
src/main/java/com/aicareercoach/
├── AiCareerCoachApplication.java
├── controller/
│   └── UserController.java
├── domain/
│   ├── User.java
│   ├── Goal.java
│   ├── Roadmap.java
│   ├── Task.java
│   ├── MoodLog.java
│   ├── LifeEventLog.java
│   ├── UserSkill.java
│   ├── Gender.java
│   └── JobRole.java
├── dto/
│   ├── MoodRequest.java
│   ├── LifeEventRequest.java
│   ├── GoalRequest.java
│   └── TaskResponse.java
├── repository/
│   ├── UserRepository.java
│   ├── GoalRepository.java
│   ├── RoadmapRepository.java
│   ├── TaskRepository.java
│   ├── MoodLogRepository.java
│   └── LifeEventLogRepository.java
└── service/
    └── UserService.java
``` 