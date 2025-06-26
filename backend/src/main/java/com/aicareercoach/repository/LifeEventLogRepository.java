package com.aicareercoach.repository;

import com.aicareercoach.domain.LifeEventLog;
import com.aicareercoach.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LifeEventLogRepository extends JpaRepository<LifeEventLog, Long> {
    List<LifeEventLog> findByUserOrderByCreatedAtDesc(User user);
    LifeEventLog findFirstByUserOrderByCreatedAtDesc(User user);
} 