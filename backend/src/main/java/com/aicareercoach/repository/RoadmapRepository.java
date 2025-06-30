package com.aicareercoach.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.Roadmap;
import com.aicareercoach.domain.User;

@Repository
public interface RoadmapRepository extends MongoRepository<Roadmap, String> {
    List<Roadmap> findByUserOrderByCreatedAtDesc(User user);
    List<Roadmap> findByUserAndGoalId(User user, String goalId);
    List<Roadmap> findByUser(User user);
} 