package com.aicareercoach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Roadmap;
import com.aicareercoach.domain.User;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByUserOrderByCreatedAtDesc(User user);
    List<Roadmap> findByUserAndGoalId(User user, Long goalId);
    List<Roadmap> findByUser(User user);
} 