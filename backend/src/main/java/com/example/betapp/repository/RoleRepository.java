package com.example.betapp.repository;

import com.example.betapp.entity.RoleEntity;
import com.example.betapp.enums.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

  Optional<RoleEntity> findByName(RolesEnum name);
}
