package com.aicareercoach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.GoalTask;

@Repository
public interface GoalTaskRepository extends JpaRepository<GoalTask, Long> {
    
    List<GoalTask> findByGoalIdOrderByCreatedAtAsc(Long goalId);
    
    List<GoalTask> findByGoalIdAndCompletedOrderByCreatedAtAsc(Long goalId, Boolean completed);
    
    long countByGoalId(Long goalId);
    
    long countByGoalIdAndCompleted(Long goalId, Boolean completed);
} 