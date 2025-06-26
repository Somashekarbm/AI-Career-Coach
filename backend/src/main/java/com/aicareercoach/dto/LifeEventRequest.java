package com.aicareercoach.dto;

import jakarta.validation.constraints.NotBlank;

public class LifeEventRequest {
    @NotBlank(message = "Event is required")
    private String event;

    public LifeEventRequest() {}

    public LifeEventRequest(String event) {
        this.event = event;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }
} 