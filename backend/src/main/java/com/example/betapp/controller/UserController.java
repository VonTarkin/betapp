package com.example.betapp.controller;

import com.example.betapp.dto.LoginRequest;
import com.example.betapp.dto.RegisterRequest;
import com.example.betapp.entity.UserEntity;
import com.example.betapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
    return userService.registerUser(request);
  }

  @PostMapping("/login")
  public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {
    return userService.loginUser(request.getEmail(), request.getPassword());
  }

  @GetMapping
  public ResponseEntity<List<UserEntity>> getAllUsers() {
    return userService.getAllUsers();
  }

  @GetMapping("/{id}")
  public ResponseEntity<String> getUserById(@PathVariable Long id) {
    return userService.getUserById(id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    return userService.deleteUser(id);
  }
}
