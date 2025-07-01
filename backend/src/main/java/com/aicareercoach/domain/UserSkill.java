package com.aicareercoach.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "userskills")
public class UserSkill {
    @Id
    private String id;

    @JsonBackReference
    private User user;

    private String skillName;

    private String proficiencyLevel; // e.g., "beginner", "intermediate", "advanced", "expert"

    private Integer yearsOfExperience;

    private Boolean isTargetSkill = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }
    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }
    public Integer getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(Integer yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }
    public Boolean getIsTargetSkill() { return isTargetSkill; }
    public void setIsTargetSkill(Boolean isTargetSkill) { this.isTargetSkill = isTargetSkill; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
} 