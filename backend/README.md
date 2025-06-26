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

### User Authentication API

#### Register
- **Endpoint:** `POST /api/v1/auth/register`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "dummy-token",
    "userId": 1,
    "email": "user@example.com",
    "firstName": "",
    "lastName": ""
  }
  ```

#### Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "dummy-token",
    "userId": 1,
    "email": "user@example.com",
    "firstName": "",
    "lastName": ""
  }
  ```

> **Note:** The `token` is a placeholder. Replace with a real JWT implementation for production.

## Sample Flow

### 1. Create Goal
```