package com.aicareercoach.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Goal;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    
    List<Goal> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Goal> findByUserIdAndCategoryOrderByCreatedAtDesc(Long userId, String category);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId AND (LOWER(g.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(g.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Goal> findByUserIdAndSearchTerm(@Param("userId") Long userId, @Param("searchTerm") String searchTerm);
    
    Optional<Goal> findByIdAndUserId(Long id, Long userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId ORDER BY g.deadline ASC")
    List<Goal> findByUserIdOrderByDeadlineAsc(@Param("userId") Long userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId ORDER BY g.dailyHours DESC")
    List<Goal> findByUserIdOrderByDailyHoursDesc(@Param("userId") Long userId);
    
    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId ORDER BY g.progressPercentage DESC")
    List<Goal> findByUserIdOrderByProgressDesc(@Param("userId") Long userId);

} 