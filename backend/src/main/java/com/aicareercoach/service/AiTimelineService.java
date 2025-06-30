package com.aicareercoach.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.aicareercoach.dto.TimelineRequest;
import com.aicareercoach.dto.TimelineResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AiTimelineService {
    @Value("${ai.timeline.enabled:false}")
    private boolean aiEnabled;

    @Value("${OPENAI_API_KEY:}")
    private String openAiApiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private static final String MODEL = "gpt-3.5-turbo";  //check for some good performance for task generation, low cost model(gpt-4.1-nano-2025-04-14)

    public TimelineResponse generateTimeline(TimelineRequest req) {
        if (!aiEnabled) {
            throw new UnsupportedOperationException("AI timeline generation is disabled.");
        }
        // Compose prompt
        String prompt = buildTimelinePrompt(req);
        String aiResult = callOpenAi(prompt);
        // TODO: Parse aiResult into TimelineResponse
        return parseTimelineResponse(aiResult, req);
    }

    public TimelineResponse rescheduleTimeline(TimelineRequest req, String mood, String event) {
        if (!aiEnabled) {
            throw new UnsupportedOperationException("AI timeline rescheduling is disabled.");
        }
        String prompt = buildReschedulePrompt(req, mood, event);
        String aiResult = callOpenAi(prompt);
        // TODO: Parse aiResult into TimelineResponse
        return parseTimelineResponse(aiResult, req);
    }

    private String buildTimelinePrompt(TimelineRequest req) { //cusomize the prompt use more precise response based logic (alos dont forget to keep the prompt as small as possible to reduce the cost)
        return "Generate a detailed day-by-day learning roadmap for the following goal: '" + req.getGoalTitle() + "'. Description: '" + req.getGoalDescription() + "'. Category: '" + req.getCategory() + "'. Deadline: '" + req.getDeadline() + "'. Daily hours: '" + req.getDailyHours() + "'. User experience: '" + req.getUserExperience() + "'. Learning style: '" + req.getLearningStyle() + "'. Preferred resources: '" + req.getPreferredResources() + "'. Format the output as a JSON list of days, each with a heading, description, estimated hours, and tips.";
    }

    private String buildReschedulePrompt(TimelineRequest req, String mood, String event) { //cusomize the prompt use more precise response based logic (alos dont forget to keep the prompt as small as possible to reduce the cost)
        return "Given the following goal and its timeline, reschedule the daily tasks based on the user's current mood ('" + mood + "') and life event ('" + event + "'). Goal: '" + req.getGoalTitle() + "'. Description: '" + req.getGoalDescription() + "'. Deadline: '" + req.getDeadline() + "'. Daily hours: '" + req.getDailyHours() + "'. Format the output as a JSON list of days, each with a heading, description, estimated hours, and tips.";
    }

    private String callOpenAi(String prompt) {
        RestTemplate restTemplate = new RestTemplate();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiApiKey);
        headers.set("Content-Type", "application/json");
        String body = "{\"model\":\"" + MODEL + "\",\"messages\":[{\"role\":\"user\",\"content\":\"" + prompt.replace("\"", "\\\"") + "\"}]}";
        org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(body, headers);
        org.springframework.http.ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, entity, String.class);
        return response.getBody();
    }

    private TimelineResponse parseTimelineResponse(String aiResult, TimelineRequest req) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(aiResult);
            // Get the content string from OpenAI response
            String content = root.path("choices").get(0).path("message").path("content").asText();
            // Parse the content as JSON (it should be a JSON array of days)
            JsonNode daysNode = mapper.readTree(content);
            List<TimelineResponse.DayTask> dayTasks = new ArrayList<>();
            for (JsonNode day : daysNode) {
                TimelineResponse.DayTask task = new TimelineResponse.DayTask();
                task.setDayNumber(day.path("dayNumber").asInt());
                task.setTitle(day.path("title").asText());
                task.setDescription(day.path("description").asText());
                task.setEstimatedHours(day.path("estimatedHours").asInt(1));
                task.setPoints(day.path("points").asInt(0));
                task.setStatus(day.path("status").asText("pending"));
                task.setResources(day.path("resources").asText(""));
                task.setTips(day.path("tips").asText(""));
                dayTasks.add(task);
            }
            TimelineResponse resp = new TimelineResponse();
            resp.setGoalId(req.getGoalId());
            resp.setGoalTitle(req.getGoalTitle());
            resp.setDeadline(req.getDeadline());
            resp.setTotalDays(dayTasks.size());
            resp.setCurrentDay(1);
            resp.setOverallProgress(0.0);
            resp.setDailyTasks(dayTasks);
            resp.setEstimatedCompletionDate(req.getDeadline() != null ? req.getDeadline().toString() : "");
            resp.setDifficultyLevel("AI-generated");
            resp.setRecommendedPace(req.getDailyHours() != null ? req.getDailyHours() + " hrs/day" : "");
            return resp;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse AI timeline response: " + e.getMessage());
        }
    }
} 