package com.aicareercoach.repository;

import com.aicareercoach.domain.LifeEventLog;
import com.aicareercoach.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LifeEventLogRepository extends MongoRepository<LifeEventLog, String> {
    List<LifeEventLog> findByUserIdOrderByCreatedAtDesc(String userId);
    LifeEventLog findFirstByUserIdOrderByCreatedAtDesc(String userId);
} 