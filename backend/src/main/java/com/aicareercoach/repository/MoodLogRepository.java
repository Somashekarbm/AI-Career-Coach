package com.aicareercoach.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aicareercoach.domain.MoodLog;
import com.aicareercoach.domain.User;

@Repository
public interface MoodLogRepository extends MongoRepository<MoodLog, String> {
    List<MoodLog> findByUserOrderByCreatedAtDesc(User user);
    MoodLog findFirstByUserOrderByCreatedAtDesc(User user);
} 