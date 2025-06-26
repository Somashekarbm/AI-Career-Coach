# Sample User Flow - AI Career Coach

This document demonstrates the complete user flow for the AI Career Coach platform, including mood/energy tracking and life event handling.

## Flow Overview

1. **User sets a goal** (e.g., "Become Full Stack Developer")
2. **System generates a roadmap** (hardcoded for now)
3. **User updates mood/energy** (affects task suggestions)
4. **System suggests next task** (adapts to mood)
5. **User marks life event** (e.g., "sick" - reschedules tasks)
6. **System reschedules tasks** accordingly

## API Endpoints Used

### 1. Create Goal
```http
POST /api/v1/users/{userId}/goals
Content-Type: application/json

{
  "title": "Become Full Stack Developer",
  "description": "Transition from tech support to full stack development"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Become Full Stack Developer",
  "description": "Transition from tech support to full stack development",
  "status": "active",
  "createdAt": "2024-01-15T10:00:00"
}
```

### 2. Generate Roadmap
```http
POST /api/v1/users/{userId}/goals/{goalId}/roadmap
```

**Response:**
```json
{
  "id": 1,
  "title": "Roadmap for Become Full Stack Developer",
  "description": "Personalized learning path to achieve your goal",
  "createdAt": "2024-01-15T10:05:00"
}
```

*Note: This automatically creates 6 hardcoded tasks:*
- Learn HTML & CSS Basics (Priority: 1, Due: tomorrow)
- JavaScript Fundamentals (Priority: 2, Due: +3 days)
- React.js Introduction (Priority: 3, Due: +7 days)
- Backend Development (Priority: 2, Due: +10 days)
- Database Design (Priority: 2, Due: +14 days)
- Project Building (Priority: 3, Due: +21 days)

### 3. Update Mood/Energy
```http
POST /api/v1/users/{userId}/mood
Content-Type: application/json

{
  "mood": "tired"
}
```

**Response:**
```json
{
  "message": "Mood updated successfully",
  "mood": "tired"
}
```

### 4. Get Next Task (Adapts to Mood)
```http
GET /api/v1/users/{userId}/next-task
```

**Response (if mood is "tired"):**
```json
{
  "id": 1,
  "title": "Learn HTML & CSS Basics",
  "description": "Complete basic HTML and CSS tutorials",
  "status": "pending",
  "dueDate": "2024-01-16T10:00:00",
  "priority": 1,
  "roadmapTitle": "Roadmap for Become Full Stack Developer"
}
```

*Note: When user is "tired", system suggests lower priority tasks (priority ≤ 2)*

### 5. Log Life Event
```http
POST /api/v1/users/{userId}/life-event
Content-Type: application/json

{
  "event": "sick"
}
```

**Response:**
```json
{
  "message": "Life event logged successfully",
  "event": "sick"
}
```

*Note: This automatically reschedules overdue tasks to tomorrow*

### 6. Complete Task
```http
POST /api/v1/users/{userId}/tasks/{taskId}/complete
```

**Response:**
```json
{
  "message": "Task completed successfully"
}
```

## Hardcoded Logic (Future AI Replacement)

### Mood-Based Task Selection
- **"tired"**: Suggests tasks with priority ≤ 2 (easier tasks)
- **"active"**: Suggests any available task (default behavior)
- **"neutral"**: Default behavior

### Life Event Handling
- **"sick"**: Reschedules all overdue tasks to tomorrow
- **"no time"**: Reschedules all overdue tasks to tomorrow
- **Other events**: Logged but no automatic rescheduling

### Roadmap Generation
Currently generates a fixed set of 6 tasks for "Full Stack Developer" goal:
1. HTML & CSS Basics (Priority 1)
2. JavaScript Fundamentals (Priority 2)
3. React.js Introduction (Priority 3)
4. Backend Development (Priority 2)
5. Database Design (Priority 2)
6. Project Building (Priority 3)

## Testing the Flow

### Using curl commands:

```bash
# 1. Create a user (you'll need to implement user creation first)
# For now, assume user ID = 1

# 2. Create a goal
curl -X POST http://localhost:8080/api/v1/users/1/goals \ -H "Content-Type: application/json" \ -d '{"title": "Become Full Stack Developer", "description": "Transition from tech support"}'

# 3. Generate roadmap (use goal ID from step 2)
curl -X POST http://localhost:8080/api/v1/users/1/goals/1/roadmap

# 4. Update mood
curl -X POST http://localhost:8080/api/v1/users/1/mood \
  -H "Content-Type: application/json" \
  -d '{"mood": "tired"}'

# 5. Get next task
curl http://localhost:8080/api/v1/users/1/next-task

# 6. Log life event
curl -X POST http://localhost:8080/api/v1/users/1/life-event \
  -H "Content-Type: application/json" \
  -d '{"event": "sick"}'

# 7. Complete a task
curl -X POST http://localhost:8080/api/v1/users/1/tasks/1/complete
```

## Future Enhancements

1. **AI Integration**: Replace hardcoded logic with GPT API calls
2. **Dynamic Task Generation**: Generate tasks based on user's current skills and target role
3. **Advanced Mood Analysis**: Consider mood patterns over time
4. **Smart Rescheduling**: More sophisticated task rescheduling algorithms
5. **Collaborative Features**: Group goals and shared progress tracking 