package com.example.betapp.service;

import com.example.betapp.dto.LoginResponse;
import com.example.betapp.dto.RegisterRequest;
import com.example.betapp.dto.UserResponse;
import com.example.betapp.entity.RoleEntity;
import com.example.betapp.entity.UserEntity;
import com.example.betapp.enums.RolesEnum;
import com.example.betapp.repository.RoleRepository;
import com.example.betapp.repository.UserRepository;
import com.example.betapp.security.JwtService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Map;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final MessageSource messageSource;
  private final JwtService jwtService;


  public UserService(UserRepository userRepository, RoleRepository roleRepository, MessageSource messageSource,
                     JwtService jwtService) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.messageSource = messageSource;
    this.passwordEncoder = new BCryptPasswordEncoder();
    this.jwtService = jwtService;
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
  public ResponseEntity<LoginResponse> loginUser(String email, String password) {
    Locale locale = LocaleContextHolder.getLocale();
    Optional<UserEntity> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
      String msg = messageSource.getMessage("ERROR_INVALID_CREDENTIALS", null, locale);

      LoginResponse errorResponse = new LoginResponse(
              null,null, null, null, msg
      );

      return ResponseEntity.status(401).body(errorResponse);
    }

    UserEntity user = userOpt.get();

    if (!passwordEncoder.matches(password, user.getPassword())) {
      String msg = messageSource.getMessage("ERROR_INVALID_CREDENTIALS", null, locale);

      LoginResponse errorResponse = new LoginResponse(
              null, null, null, null, msg
      );

      return ResponseEntity.status(401).body(errorResponse);
    }

    //Ok, so token goes here I think.
    String token = jwtService.generateToken(user);
    String successMsg = messageSource.getMessage("SUCCESS_USER_LOGGED_IN", null, locale);

    LoginResponse successResponse = new LoginResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            user.getRole().getName().name(),
            successMsg
    );

    return ResponseEntity.ok(successResponse);
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

  @Transactional(readOnly = true)
  public ResponseEntity<?> getCurrentUser() {
    Locale locale = LocaleContextHolder.getLocale();
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()
            || "anonymousUser".equals(authentication.getPrincipal())) {
      String msg = messageSource.getMessage(
              "ERROR_INVALID_AUTHORIZATION",
              null,
              locale
      );

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(Map.of(
                      "error", "ERROR_INVALID_AUTHORIZATION",
                      "message", msg
              ));
    }

    String email = authentication.getName();

    Optional<UserEntity> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
      String msg = messageSource.getMessage(
              "ERROR_USER_NOT_AVAILABLE",
              null,
              locale
      );

      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(Map.of(
                      "error", "ERROR_USER_NOT_AVAILABLE",
                      "message", msg
              ));
    }

    UserEntity user = userOpt.get();
    UserResponse response = new UserResponse(user.getUsername(), user.getEmail(), user.getCreatedAt());

    return ResponseEntity.ok(response);
  }

}
