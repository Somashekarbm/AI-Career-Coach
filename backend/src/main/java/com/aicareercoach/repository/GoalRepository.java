package com.aicareercoach.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Goal;

@Repository
public interface GoalRepository extends MongoRepository<Goal, String> {
    List<Goal> findByUserIdOrderByCreatedAtDesc(String userId);
    List<Goal> findByUserIdAndCategoryOrderByCreatedAtDesc(String userId, String category);
    List<Goal> findByUserIdAndTitleContainingIgnoreCaseOrUserIdAndDescriptionContainingIgnoreCase(
        String userId1, String title, String userId2, String description);
    Optional<Goal> findByIdAndUserId(String id, String userId);
    List<Goal> findByUserIdOrderByDeadlineAsc(String userId);
    List<Goal> findByUserIdOrderByDailyHoursDesc(String userId);
    List<Goal> findByUserIdOrderByProgressPercentageDesc(String userId);
    List<Goal> findByUserIdAndCategoryOrderByDeadlineAsc(String userId, String category);
    List<Goal> findByUserIdAndCategoryOrderByDailyHoursDesc(String userId, String category);
    List<Goal> findByUserIdAndCategoryOrderByProgressPercentageDesc(String userId, String category);
} 