package com.example.betapp.service;

import com.example.betapp.dto.RegisterRequest;
import com.example.betapp.entity.RoleEntity;
import com.example.betapp.entity.UserEntity;
import com.example.betapp.enums.RolesEnum;
import com.example.betapp.repository.RoleRepository;
import com.example.betapp.repository.UserRepository;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final MessageSource messageSource;

  public UserService(UserRepository userRepository, RoleRepository roleRepository, MessageSource messageSource) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.messageSource = messageSource;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  @Transactional
  public ResponseEntity<String> registerUser(RegisterRequest request) {
    Locale locale = LocaleContextHolder.getLocale();

    if (userRepository.existsByUsername(request.getUsername())) {
      return ResponseEntity.badRequest().body(
              messageSource.getMessage("ERROR_USERNAME_EXISTS", null, locale)
      );
    }
    if (userRepository.existsByEmail(request.getEmail())) {
      return ResponseEntity.badRequest().body(
              messageSource.getMessage("ERROR_EMAIL_EXISTS", null, locale)
      );
    }
    if (userRepository.existsByPhone(request.getPhone())) {
      return ResponseEntity.badRequest().body(
              messageSource.getMessage("ERROR_PHONE_EXISTS", null, locale)
      );
    }

    RoleEntity role = roleRepository.findByName(RolesEnum.ROLE_USER)
            .orElseThrow(() -> new RuntimeException(
                    messageSource.getMessage("ERROR_ROLE_NOT_FOUND", null, locale)
            ));

    UserEntity user = new UserEntity();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(role);

    userRepository.save(user);

    return ResponseEntity.ok(
            messageSource.getMessage("SUCCESS_USER_REGISTERED", null, locale)
    );
  }

  @Transactional(readOnly = true)
  public ResponseEntity<String> loginUser(String email, String password) {
    Locale locale = LocaleContextHolder.getLocale();

    Optional<UserEntity> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
      return ResponseEntity.status(401).body(
              messageSource.getMessage("ERROR_INVALID_CREDENTIALS", null, locale)
      );
    }

    UserEntity user = userOpt.get();
    if (!passwordEncoder.matches(password, user.getPassword())) {
      return ResponseEntity.status(401).body(
              messageSource.getMessage("ERROR_INVALID_CREDENTIALS", null, locale)
      );
    }

    return ResponseEntity.ok(
            messageSource.getMessage("SUCCESS_USER_LOGGED_IN", null, locale)
    );
  }

  public ResponseEntity<List<UserEntity>> getAllUsers() {
    return ResponseEntity.ok(userRepository.findAll());
  }

  public ResponseEntity<String> getUserById(Long id) {
    Locale locale = LocaleContextHolder.getLocale();

    Optional<UserEntity> user = userRepository.findById(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(
              messageSource.getMessage("SUCCESS_USER_FOUND", null, locale)
      );
    } else {
      return ResponseEntity.status(404).body(
              messageSource.getMessage("ERROR_USER_NOT_FOUND", null, locale)
      );
    }
  }

  public ResponseEntity<String> deleteUser(Long id) {
    Locale locale = LocaleContextHolder.getLocale();

    if (!userRepository.existsById(id)) {
      return ResponseEntity.status(404).body(
              messageSource.getMessage("ERROR_USER_NOT_FOUND", null, locale)
      );
    }

    userRepository.deleteById(id);

    return ResponseEntity.ok(
            messageSource.getMessage("SUCCESS_USER_DELETED", null, locale)
    );
  }
}
