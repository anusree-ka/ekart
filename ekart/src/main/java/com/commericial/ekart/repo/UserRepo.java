package com.commericial.ekart.repo;

import com.commericial.ekart.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmailId(String emailId);
}
