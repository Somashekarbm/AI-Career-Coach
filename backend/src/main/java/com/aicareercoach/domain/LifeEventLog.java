package com.aicareercoach.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "lifeeventlogs")
public class LifeEventLog {
    @Id
    private String id;

    private User user;

    private String event; // e.g., "sick", "no time"

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
} 