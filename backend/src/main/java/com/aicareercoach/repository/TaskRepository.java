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
    List<Task> findByUserOrderByDueDateAsc(User user);
    List<Task> findByUserAndStatus(User user, String status);
    List<Task> findByUserAndStatusAndDueDateBefore(User user, String status, LocalDateTime date);
    List<Task> findByUserAndRoadmapIdOrderByPriorityDesc(User user, String roadmapId);
    List<Task> findByUser(User user);
    Optional<Task> findByIdAndUser(String id, User user);
} 