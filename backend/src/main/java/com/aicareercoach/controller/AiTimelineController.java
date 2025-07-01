package com.aicareercoach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aicareercoach.dto.TimelineRequest;
import com.aicareercoach.dto.TimelineResponse;
import com.aicareercoach.service.AiTimelineService;

@RestController
@RequestMapping("/ai/timeline")
@CrossOrigin(origins = "*")
public class AiTimelineController {
    @Autowired
    private AiTimelineService aiTimelineService;

    @Value("${ai.timeline.enabled:false}")
    private boolean aiEnabled;

    @PostMapping
    public ResponseEntity<?> generateTimeline(@RequestBody TimelineRequest req, @RequestHeader("Authorization") String token) {
        if (!aiEnabled) {
            return ResponseEntity.status(403).body("AI timeline feature is disabled.");
        }
        try {
            TimelineResponse resp = aiTimelineService.generateTimeline(req);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/reschedule")
    public ResponseEntity<?> rescheduleTimeline(@RequestBody TimelineRequest req, @RequestParam String mood, @RequestParam String event, @RequestHeader("Authorization") String token) {
        if (!aiEnabled) {
            return ResponseEntity.status(403).body("AI timeline feature is disabled.");
        }
        try {
            TimelineResponse resp = aiTimelineService.rescheduleTimeline(req, mood, event);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
} 