package com.aicareercoach.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Goal;

@Repository
public interface GoalRepository extends MongoRepository<Goal, String> {
    
    List<Goal> findByUserIdOrderByCreatedAtDesc(String userId);
    
    List<Goal> findByUserIdAndCategoryOrderByCreatedAtDesc(String userId, String category);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId AND (LOWER(g.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(g.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Goal> findByUserIdAndSearchTerm(@Param("userId") String userId, @Param("searchTerm") String searchTerm);
    
    Optional<Goal> findByIdAndUserId(String id, String userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId ORDER BY g.deadline ASC")
    List<Goal> findByUserIdOrderByDeadlineAsc(@Param("userId") String userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId ORDER BY g.dailyHours DESC")
    List<Goal> findByUserIdOrderByDailyHoursDesc(@Param("userId") String userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId ORDER BY g.progressPercentage DESC")
    List<Goal> findByUserIdOrderByProgressDesc(@Param("userId") String userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId AND g.category = :category ORDER BY g.deadline ASC")
    List<Goal> findByUserIdAndCategoryOrderByDeadlineAsc(@Param("userId") String userId, @Param("category") String category);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId AND g.category = :category ORDER BY g.dailyHours DESC")
    List<Goal> findByUserIdAndCategoryOrderByDailyHoursDesc(@Param("userId") String userId, @Param("category") String category);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId AND g.category = :category ORDER BY g.progressPercentage DESC")
    List<Goal> findByUserIdAndCategoryOrderByProgressDesc(@Param("userId") String userId, @Param("category") String category);
} 