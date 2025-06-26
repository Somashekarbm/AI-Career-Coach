package com.aicareercoach.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Goal;
import com.aicareercoach.domain.User;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUserOrderByCreatedAtDesc(User user);
    List<Goal> findByUserAndStatus(User user, String status);
    List<Goal> findByUser(User user);
    Optional<Goal> findByIdAndUser(Long id, User user);
} 