# AI Career Coach

An intelligent platform that helps professionals transition to their dream roles through personalized learning roadmaps, smart scheduling, and collaborative features.

## 🎯 Project Overview

AI Career Coach is designed to help professionals (like tech support employees wanting to become full-stack developers) create and follow personalized learning paths to achieve their career goals. The platform provides intelligent scheduling, progress tracking, and collaborative features to maximize success rates.

## 🚀 Key Features

### Phase 1 (Current)
- **User Management**: Registration, authentication, profile management
- **Goal Setting**: Define career goals, current skills, target roles
- **Roadmap Generation**: Create personalized learning paths
- **Task Management**: Daily/weekly task scheduling and tracking
- **Progress Tracking**: Monitor learning progress and achievements

### Phase 2 (Future)
- **AI Integration**: GPT-powered task suggestions and roadmap optimization
- **Dynamic Rescheduling**: Intelligent task rescheduling based on completion status
- **Mood-based Adaptation**: Adjust difficulty based on user energy levels
- **Collaborative Groups**: Team-based learning with shared goals
- **Buffer Days & Priority Scoring**: Smart scheduling with buffer time
- **Catch-up Mode**: Weekend recovery sessions for busy weeks

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API Documentation**: OpenAPI/Swagger
- **Testing**: JUnit 5, Mockito

### Frontend (Future)
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: Headless UI, Heroicons

### AI Integration (Future)
- **Primary**: OpenAI GPT API
- **Fallback**: Rule-based task generation
- **Caching**: Redis for API responses

## 📁 Project Structure

```
ai-career-coach/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
├── frontend/               # React application (future)
├── docs/                   # Documentation
├── docker/                 # Docker configurations
└── README.md
```

## 🎯 Implementation Phases

### Phase 1: Core Backend (Current)
1. **User Management System**
   - User registration and authentication
   - Profile management (skills, experience, goals)
   - Role-based access control

2. **Goal & Roadmap Management**
   - Goal definition and categorization
   - Roadmap generation algorithms
   - Skill gap analysis

3. **Task Management System**
   - Task creation and scheduling
   - Progress tracking
   - Completion status management

4. **Basic API Endpoints**
   - RESTful API design
   - Data validation and error handling
   - API documentation

### Phase 2: AI Integration
1. **AI-Powered Features**
   - Task suggestion generation
   - Roadmap optimization
   - Personalized recommendations

2. **Advanced Scheduling**
   - Dynamic rescheduling
   - Buffer day management
   - Priority scoring

### Phase 3: Frontend & Collaboration
1. **React Frontend**
   - User interface development
   - Real-time updates
   - Responsive design

2. **Collaborative Features**
   - Group management
   - Team communication
   - Shared goals and progress

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- PostgreSQL 13+
- Node.js 18+ (for frontend)

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup (Future)
```bash
cd frontend
npm install
npm start
```

## 📊 Database Schema

### Core Entities
- **Users**: User profiles and authentication
- **Goals**: Career objectives and target roles
- **Skills**: Current and target skill sets
- **Roadmaps**: Learning paths and milestones
- **Tasks**: Daily/weekly learning tasks
- **Progress**: Learning progress tracking

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret
- `OPENAI_API_KEY`: OpenAI API key (future)
- `REDIS_URL`: Redis connection string (future)

## 📝 API Documentation

API documentation will be available at `http://localhost:8080/swagger-ui.html` when the backend is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 