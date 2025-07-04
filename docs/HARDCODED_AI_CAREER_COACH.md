# Hardcoded AI Career Coach System

This document describes the implementation of a hardcoded AI Career Coach system that simulates goal tracking and daily tasks without using actual AI.

## Overview

The system provides a complete goal lifecycle management with:
- Goal creation with automatic task generation
- Daily task tracking and completion
- Progress monitoring
- Goal completion detection

## Features

### 1. Goal Creation
When a user creates a goal, the system automatically generates a series of daily tasks based on the goal type:

**Supported Goal Types:**
- **Full Stack Developer**: Comprehensive 70-day curriculum covering HTML, CSS, JavaScript, and React
- **Frontend Developer**: Focused on frontend technologies
- **Backend Developer**: Focused on backend technologies
- **Generic Career**: General career development tasks

### 2. Task Generation
The `HardcodedTemplateService` generates tasks based on the goal title:

#### Full Stack Developer Curriculum (70 days):
- **Days 1-10**: HTML fundamentals (3 tasks per day)
- **Days 11-20**: CSS and styling (3 tasks per day)
- **Days 21-40**: JavaScript programming (3 tasks per day)
- **Days 41-70**: React development (3 tasks per day)

#### Task Distribution:
- **2-3 tasks per day** for comprehensive learning
- Tasks are organized by day with different priorities (High, Medium, Low)
- If more days than tasks, review tasks are added
- Each task includes title, description, due date, and priority

### 3. Daily Task Management
- **Today's Task**: Users can view and complete today's assigned task
- **Task Completion**: Mark tasks as complete to track progress
- **Progress Tracking**: Automatic calculation of completion percentage
- **Goal Completion**: When all tasks are completed, goal status changes to "completed"

## API Endpoints

### Goal Management
- `POST /api/v1/goals` - Create a new goal (automatically generates tasks)
- `GET /api/v1/goals` - Get all goals for user
- `GET /api/v1/goals/{id}` - Get specific goal details
- `PUT /api/v1/goals/{id}` - Update goal
- `DELETE /api/v1/goals/{id}` - Delete goal

### Task Management
- `GET /api/v1/goals/{goalId}/today-task` - Get today's task for a goal
- `PUT /api/v1/goals/{goalId}/tasks/{taskId}/complete` - Mark task as completed

## Frontend Components

### 1. GoalSetPage
- Displays all user goals
- Goal creation form
- Search and filtering capabilities
- Click on goal card to view details (navigates to TaskDetails)

### 2. TaskDetails Page (Enhanced)
- Shows goal information and progress
- Displays today's task with completion functionality
- Day-to-day navigation through all tasks
- Progress tracking visualization
- Mood and life event tracking
- Focus timer and deadline countdown
- Auto-save functionality

### 3. Backend Integration
- Real-time task completion updates
- Progress calculation and goal status management
- Task generation based on goal type

## Usage Example

### Creating a Full Stack Developer Goal

**Request:**
```json
{
  "title": "Become a Full Stack Developer",
  "description": "Learn HTML, CSS, JavaScript, and React to build modern web applications",
  "category": "career",
  "dailyHours": 3.0,
  "deadline": "2025-10-04T00:00:00"
}
```

**Response:**
- Goal is created with 70 daily tasks
- Tasks are distributed from today to deadline
- Each task has a specific learning objective

### Daily Workflow

1. **View Today's Tasks**: Navigate to TaskDetails page from GoalSetPage
2. **Complete Tasks**: Click task completion buttons for each task
3. **Track Progress**: See progress bar and completion percentage
4. **Navigate Days**: Use day navigation to view past/future tasks
5. **Continue Learning**: Return tomorrow for next set of tasks

## Database Schema

### Goal Collection
```javascript
{
  "_id": "goal_id",
  "userId": "user_id",
  "title": "Goal Title",
  "description": "Goal Description",
  "category": "career",
  "dailyHours": 3.0,
  "deadline": "2025-10-04T00:00:00",
  "status": "active",
  "progressPercentage": 45,
  "totalTasks": 70,
  "completedTasks": 32,
  "createdAt": "2025-01-04T10:00:00",
  "updatedAt": "2025-01-04T10:00:00"
}
```

### GoalTask Collection
```javascript
{
  "_id": "task_id",
  "goalId": "goal_id",
  "title": "Learn HTML basics and document structure",
  "description": "Daily learning task for Become a Full Stack Developer",
  "completed": false,
  "dueDate": "2025-01-04T00:00:00",
  "priority": 2,
  "createdAt": "2025-01-04T10:00:00",
  "updatedAt": "2025-01-04T10:00:00"
}
```

## Implementation Details

### Backend Services

1. **HardcodedTemplateService**: Generates task templates based on goal type
2. **GoalService**: Manages goal lifecycle and task operations
3. **GoalTaskRepository**: Database operations for tasks

### Frontend Services

1. **goalService**: API calls for goal and task management
2. **TaskDetails Page**: Complete task management interface with day-to-day navigation
3. **GoalSetPage**: Goal listing and creation interface

## User Interface Features

### TaskDetails Page Features:
- **Goal Header**: Shows goal title, description, and overall progress
- **Today's Task**: Displays current day's task with completion status
- **Day Navigation**: Slider and buttons to navigate between days
- **Mood Tracking**: Select mood for the day (motivated, neutral, tired)
- **Life Events**: Track life events that may affect progress
- **Notes**: Add personal notes for each day
- **Focus Timer**: Built-in timer for tracking study sessions
- **Deadline Counter**: Shows remaining time until goal deadline
- **Auto-save**: Automatic progress saving
- **Progress Visualization**: Real-time progress bars and completion stats

## Future Enhancements

1. **More Goal Templates**: Add templates for different career paths
2. **Task Customization**: Allow users to modify generated tasks
3. **Progress Analytics**: Detailed progress tracking and insights
4. **Streak Tracking**: Track consecutive days of task completion
5. **AI Integration**: Replace hardcoded templates with AI-generated content

## Testing

To test the system:

1. Create a new goal with "Full Stack Developer" in the title
2. Navigate to the TaskDetails page from the GoalSetPage
3. View today's tasks (2-3 tasks should be displayed)
4. Mark tasks as complete one by one
5. Use day navigation to explore different days
6. Verify progress updates in real-time
7. Continue with daily tasks until goal completion

The system provides a complete simulation of an AI-powered career coaching experience without requiring actual AI integration, using the existing TaskDetails page for comprehensive day-to-day task management. 