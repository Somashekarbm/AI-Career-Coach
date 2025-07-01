package com.aicareercoach.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.GoalTask;

@Repository
public interface GoalTaskRepository extends MongoRepository<GoalTask, String> {
    
    List<GoalTask> findByGoalIdOrderByCreatedAtAsc(String goalId);
    
    List<GoalTask> findByGoalIdAndCompletedOrderByCreatedAtAsc(String goalId, Boolean completed);
    
    long countByGoalId(String goalId);
    
    long countByGoalIdAndCompleted(String goalId, Boolean completed);
} 