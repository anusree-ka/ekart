package com.oauth2.authserver.repo;

import com.oauth2.authserver.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmailId(String emailId);
}
