package com.aicareercoach;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main Spring Boot application class for AI Career Coach backend.
 * 
 * This application provides a comprehensive platform for career development
 * with personalized learning roadmaps, task management, and progress tracking.
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling
public class AiCareerCoachApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiCareerCoachApplication.class, args);
    }
} 