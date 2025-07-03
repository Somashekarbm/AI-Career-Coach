package com.aicareercoach.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Task;
import com.aicareercoach.domain.User;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserIdOrderByDueDateAsc(String userId);
    List<Task> findByUserIdAndStatus(String userId, String status);
    List<Task> findByUserIdAndStatusAndDueDateBefore(String userId, String status, LocalDateTime date);
    List<Task> findByUserIdAndRoadmapIdOrderByPriorityDesc(String userId, String roadmapId);
    List<Task> findByUserId(String userId);
    Optional<Task> findByIdAndUserId(String id, String userId);
} 