package com.example.betapp.service;

import com.example.betapp.dto.RegisterRequest;
import com.example.betapp.entity.RoleEntity;
import com.example.betapp.entity.UserEntity;
import com.example.betapp.enums.RolesEnum;
import com.example.betapp.repository.RoleRepository;
import com.example.betapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, RoleRepository roleRepository) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  @Transactional
  public ResponseEntity<UserEntity> registerUser(RegisterRequest request) {
    if (userRepository.existsByUsername(request.getUsername())) {
      return ResponseEntity.badRequest().build();
    }
    if (userRepository.existsByEmail(request.getEmail())) {
      return ResponseEntity.badRequest().build();
    }
    if (userRepository.existsByPhone(request.getPhone())) {
      return ResponseEntity.badRequest().build();
    }

    RoleEntity role = roleRepository.findByName(RolesEnum.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Default role ROLE_USER not found in database"));

    UserEntity user = new UserEntity();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(role);

    UserEntity saved = userRepository.save(user);
    return ResponseEntity.ok(saved);
  }


  @Transactional(readOnly = true)
  public ResponseEntity<String> loginUser(String email, String password) {
    Optional<UserEntity> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
      return ResponseEntity.status(401).body("Invalid email or password");
    }

    UserEntity user = userOpt.get();
    if (!passwordEncoder.matches(password, user.getPassword())) {
      return ResponseEntity.status(401).body("Invalid email or password");
    }

    return ResponseEntity.ok("Login successful!");
  }

  public ResponseEntity<List<UserEntity>> getAllUsers() {
    return ResponseEntity.ok(userRepository.findAll());
  }

  public ResponseEntity<UserEntity> getUserById(Long id) {
    Optional<UserEntity> user = userRepository.findById(id);
    return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  public ResponseEntity<Void> deleteUser(Long id) {
    if (!userRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    userRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
