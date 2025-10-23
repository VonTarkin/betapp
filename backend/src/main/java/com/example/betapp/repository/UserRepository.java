package com.example.betapp.repository;

import com.example.betapp.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

  Optional<UserEntity> findByUsername(String username);

  Optional<UserEntity> findByEmail(String email);

  Optional<UserEntity> findByPhone(String phone);

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  boolean existsByPhone(String phone);
}
